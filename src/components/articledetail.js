import './articledetail.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FetchArticle from '../api/articlerequest';

const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;

/* eslint-disable no-underscore-dangle */

// Resolve a CF image reference to a URL (prefer Dynamic Media delivery).
function resolveImage(img) {
  if (!img) return '';
  if (img._dynamicUrl) return `${aempublishurl}${img._dynamicUrl}`;
  return img._publishUrl || '';
}

// Responsive hero. When the CF image exposes Dynamic Media smart crops
// (_dmS7Url + _smartCrops), pick the smallest crop that still covers the hero
// container width and re-evaluate on resize, swapping the src to the matching
// `s7url:CropName`. This is driven in JS because native srcset/sizes only ever
// upgrades to a larger candidate and never reverts to a smaller crop when the
// screen narrows again. Falls back to the plain delivery URL when there are no
// smart crops. Mirrors the WestJet article block behaviour.
function ArticleHero({ heroImage, alt }) {
  const figureRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const figure = figureRef.current;
    const img = imgRef.current;
    if (!figure || !img || !heroImage) return undefined;

    const s7 = heroImage._dmS7Url;
    const crops = Array.isArray(heroImage._smartCrops)
      ? heroImage._smartCrops
        .filter((c) => c && c.name && c.width)
        .sort((a, b) => a.width - b.width)
      : [];

    if (s7 && crops.length) {
      const applyCrop = () => {
        const width = figure.clientWidth || window.innerWidth || 0;
        const crop = crops.find((c) => c.width >= width) || crops[crops.length - 1];
        const next = `${s7}:${crop.name}`;
        if (img.getAttribute('src') !== next) img.setAttribute('src', next);
      };
      applyCrop();
      // Re-evaluate on both container and viewport changes so the crop keeps
      // tracking the available width across environments.
      window.addEventListener('resize', applyCrop);
      let ro;
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(applyCrop);
        ro.observe(figure);
      }
      return () => {
        window.removeEventListener('resize', applyCrop);
        if (ro) ro.disconnect();
      };
    }

    const src = resolveImage(heroImage);
    if (src) img.setAttribute('src', src);
    return undefined;
  }, [heroImage]);

  if (!heroImage) return null;
  return (
    <figure className="articleDetailHero" ref={figureRef}>
      <img ref={imgRef} alt={alt || ''} />
    </figure>
  );
}

function ArticleAuthor({ author }) {
  if (!author) return null;
  const picSrc = resolveImage(author.profilePicture);
  return (
    <div className="articleDetailAuthor">
      {picSrc && (
        <img className="articleDetailAuthorPic" src={picSrc} alt={author.name || ''} loading="lazy" />
      )}
      <div className="articleDetailAuthorMeta">
        {author.name && <span className="articleDetailAuthorName">{author.name}</span>}
        {author.role && <span className="articleDetailAuthorRole">{author.role}</span>}
      </div>
    </div>
  );
}

function ArticleDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const path = searchParams.get('path');
  const variation = searchParams.get('variation') || 'main';

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true);
      const item = await FetchArticle(path, variation);
      setArticle(item);
      setLoading(false);
    };
    load();
  }, [path, variation]);

  if (loading) {
    return <div className="articleDetailLoading">Loading...</div>;
  }

  if (!article) {
    return <div className="articleDetailError">Article not found</div>;
  }

  const paragraphs = (article.main?.plaintext || '')
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <article
      className="articleDetail"
      data-aue-resource={`urn:aemconnection:${article._path}/jcr:content/data/master`}
      data-aue-type="reference"
      data-aue-filter="cf"
    >
      <button type="button" className="articleDetailBack" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <ArticleHero heroImage={article.heroImage} alt={article.headline} />

      {article.headline && (
        <h1 data-aue-prop="headline" data-aue-type="text" className="articleDetailHeadline">{article.headline}</h1>
      )}

      <ArticleAuthor author={article.author} />

      <div data-aue-prop="main" data-aue-type="richtext" className="articleDetailBody">
        {paragraphs.map((para, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{para}</p>
        ))}
      </div>
    </article>
  );
}

export default ArticleDetail;
