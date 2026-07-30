import './articles.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchArticle from '../api/articlerequest';
import FetchArticleListByTag from '../api/articlelistbytagrequest';

const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

// The dashboard Content Fragment lists articles as references. Pull the DAM
// path out of whatever shape the reference comes back as (a plain path string
// or an object exposing `_path`).
function toPath(ref) {
  if (!ref) return null;
  if (typeof ref === 'string') return ref;
  return ref._path || null;
}

// Prefer the Dynamic Media delivery URL, fall back to the plain publish URL.
function imageSrc(heroImage) {
  if (!heroImage) return '';
  if (heroImage._dynamicUrl) return `${aempublishurl}${heroImage._dynamicUrl}&width=470`;
  return heroImage._publishUrl || '';
}

// Keep the card teaser to the first sentence; the full copy lives on the
// article detail page.
function firstSentence(text) {
  if (!text) return '';
  const idx = text.indexOf('.');
  return idx === -1 ? text : text.slice(0, idx + 1);
}

function Articles({ articles, tag }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dashPaths = (articles || []).map(toPath).filter(Boolean);

    let active = true;
    const load = async () => {
      let resolved;
      if (tag) {
        // Personalized: first card is the top article for the user's tag, the
        // next two are the first two articles from the dashboard.
        const [taggedList, second, third] = await Promise.all([
          FetchArticleListByTag(tag),
          dashPaths[0] ? FetchArticle(dashPaths[0]) : null,
          dashPaths[1] ? FetchArticle(dashPaths[1]) : null,
        ]);
        const first = taggedList && taggedList[0] ? taggedList[0] : null;
        resolved = [first, second, third];
      } else {
        // Default: render the dashboard articles as-is.
        resolved = await Promise.all(dashPaths.map((path) => FetchArticle(path)));
      }

      if (active) {
        setItems(resolved.filter(Boolean).map((item, i) => ({
          ...item,
          _path: item._path || dashPaths[i] || '',
        })));
      }
    };

    if (!dashPaths.length && !tag) {
      setItems([]);
      return undefined;
    }

    load();
    return () => { active = false; };
  }, [articles, tag]);

  const openArticle = (path) => {
    navigate(`/article?path=${encodeURIComponent(path)}`);
  };

  return (
    <ul className="articleList">
      {items.map((article, index) => (
        <li
          key={`${article._path}-${index}`}
          className="articleCard"
          onClick={() => openArticle(article._path)}
          data-aue-resource={`urn:aemconnection:${article._path}/jcr:content/data/master`}
          data-aue-type="reference"
          data-aue-filter="cf"
        >
          {imageSrc(article.heroImage) ? (
            <img
              data-aue-prop="heroImage"
              data-aue-type="media"
              className="articleImage"
              alt="decorative"
              src={imageSrc(article.heroImage)}
            />
          ) : (
            <div className="articleImage articleImagePlaceholder" data-aue-prop="heroImage" data-aue-type="media" />
          )}
          <h5 data-aue-prop="headline" data-aue-type="text" className="articleHeading">{article.headline}</h5>
          <div data-aue-prop="main" data-aue-type="richtext" className="articleDescription">{firstSentence(article.main?.plaintext)}</div>
        </li>
      ))}
    </ul>
  );
}

export default Articles;
