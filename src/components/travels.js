import './travels.css';

function Travels({travels: travels}) {

   console.log(travels);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
   
    return (
        <ul className="travelList">
            {travels && travels.map((travel, index) => (
                <li key={index} data-aue-resource={"urn:aemconnection:" + travel._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                    <img data-aue-prop="heroImage" data-aue-type="media" className="travelImage" alt="decorative" src={aempublishurl + travel.heroImage._dynamicUrl + "&width=470"} />
                    <h5 data-aue-prop="headline" data-aue-type="text" className="travelHeading">Travel: {travel.headline}</h5>
                    <div data-aue-prop="main" data-aue-type="richtext" className="travelDescription">{travel.main['plaintext']}</div>
                </li>
            ))}
        </ul>
    )
}

export default Travels;