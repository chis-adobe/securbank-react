import './adventures.css';
import React, { useState, useEffect } from 'react';
import FetchAdventures from '../api/adventuresrequest';

function FAQ() {

    const [adventures, setAdventures] = useState(null);
    const aempublishurl = process.env.REACT_APP_AEM_PUBLISH;
    const [category, setCategory] = useState("main");
    const variation = "main"

    useEffect(() => {
      const fetchContent = async () => {
        const result = await FetchAdventures(category);
        setAdventures(result);
      };
  
      fetchContent();

    }, [category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // Update state when dropdown changes
    };
  

        return (
            <div className='adventures'>
                <h4 className='sectionHeading'>
                    Use Your Points for Adventures
                    <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                        <option value="main">Main</option>
                        <option value="family_skiing_adventure">Family</option>
                        <option value="senior">Senior</option>
                    </select>
                </h4>
                <ul className="adventureList">
                    {adventures && adventures.map((adventure, index) => (
                        <li key={adventure} data-aue-resource={"urn:aemconnection:" + adventure._path + "/jcr:content/data/master"} data-aue-type="reference" data-aue-filter="cf">
                            <img data-aue-prop="primaryImage" data-aue-type="media" src={aempublishurl + adventure.primaryImage._dynamicUrl}/>
                            <div class="content">
                                <div class="info">
                                    <h4 data-aue-prop="title" data-aue-type="text" class="title">{adventure.title}</h4>
                                    <h5 data-aue-prop="author" data-aue-type="text" class="author">{adventure.author?.firstName} {adventure.author?.lastName}</h5>
                                    <span data-aue-prop="destination" data-aue-type="text" class="location"><b>Location: </b>{adventure.destination}</span>
                                    <span data-aue-prop="date" data-aue-type="text" class="date"><b>Date: </b>{adventure.date}</span>
                                    <span class="activityType"><b>Adventure Type: </b>{adventure.adventureType}</span>
                                </div>
                                <div class="description" data-aue-prop="description" data-aue-type="text">
                                    {adventure.description.plaintext}
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
            </div>
        )
}

export default FAQ;