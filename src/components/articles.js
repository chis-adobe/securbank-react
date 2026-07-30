import './articles.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchArticle from '../api/articlerequest';

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

function Articles({ articles }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const paths = (articles || []).map(toPath).filter(Boolean);
    if (!paths.length) {
      setItems([]);
      return undefined;
    }

    let active = true;
    const load = async () => {
      const resolved = await Promise.all(
        paths.map(async (path) => {
          const item = await FetchArticle(path);
          return item ? { ...item, _path: item._path || path } : null;
        }),
      );
      if (active) setItems(resolved.filter(Boolean));
    };

    load();
    return () => { active = false; };
  }, [articles]);

  const openArticle = (path) => {
    navigate(`/article?path=${encodeURIComponent(path)}`);
  };

  return (
    <ul className="articleList">
      {items.map((article) => (
        <li
          key={article._path}
          className="articleCard"
          onClick={() => openArticle(article._path)}
          data-aue-resource={`urn:aemconnection:${article._path}/jcr:content/data/master`}
          data-aue-type="reference"
          data-aue-filter="cf"
        >
          <img
            data-aue-prop="heroImage"
            data-aue-type="media"
            className="articleImage"
            alt="decorative"
            src={imageSrc(article.heroImage)}
          />
          <h5 data-aue-prop="headline" data-aue-type="text" className="articleHeading">{article.headline}</h5>
          <div data-aue-prop="main" data-aue-type="richtext" className="articleDescription">{firstSentence(article.main?.plaintext)}</div>
        </li>
      ))}
    </ul>
  );
}

export default Articles;
