import React, { useState } from 'react';
import gouvernorat from './constants/gouvernorat'
import villes from './constants/villes'

const Dropdown = () => {  
    const [gov,setGov] = useState('default')
    const [cities,setCities] = useState([])
    const [selectedGov,setSelectedGov] = useState('--Choose Gov--')
    const [selectedCity,setSelectedCity] = useState('--Choose City--')
 
	 
    const changeGov = (event) => {
		setSelectedGov(event.target.value);
        console.log(event.target.value) 
		setCities(villes.find(ville => ville.gov === event.target.value).cities);
        console.log(cities) 
	}

	const changeCity = (event) => {
		setSelectedCity(event.target.value); 
	}
	return (
		<div id="container">
			<h2>Cascading or Dependent Dropdown using React</h2>
	            <div>
					<label>Gov</label>
					<select placeholder="Governorate" value={selectedGov} onChange={changeGov}>
						<option>--Choose Governorate--</option>
						{gouvernorat?.map((gov, key) => {
							return <option key={key}>{gov}</option>;
						})}
					</select>
				</div>
                <div>
					<label>City</label>
					<select placeholder="State" value={selectedCity} onChange={changeCity}>
						<option>--Choose State--</option>
						{cities?.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div>
				
				<div>
					<label>City</label>
					<select placeholder="City">
						<option>--Choose City--</option>
						{cities.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div>
			</div>
		)
	 
}

export default Dropdown;