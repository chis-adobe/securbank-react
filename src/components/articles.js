import './articles.css';
import { Link } from 'react-router-dom';

function Articles({articles}) {

   console.log(articles);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
   
    return (
        <ul className="articleList">
            {articles && articles.map((article, index) => (
                <li key={index} data-aue-resource={"urn:aemconnection:" + article._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                    <Link to={`/article/${encodeURIComponent(article._path)}`} className="article-link">
                        <img 
                            data-aue-prop="heroImage" 
                            data-aue-type="media" 
                            className="articleImage" 
                            alt="decorative" 
                            src={article.heroImage && article.heroImage._dynamicUrl 
                                ? aempublishurl + article.heroImage._dynamicUrl + "&width=470"
                                : "https://via.placeholder.com/470x264/cccccc/666666?text=No+Image"} 
                        />
                        <h5 data-aue-prop="headline" data-aue-type="text" className="articleHeading">{article.headline}</h5>
                        <div 
                            data-aue-prop="main" 
                            data-aue-type="richtext" 
                            className="articleDescription"
                            dangerouslySetInnerHTML={{ __html: article.blurb.html || article.main['html'] }}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Articles;