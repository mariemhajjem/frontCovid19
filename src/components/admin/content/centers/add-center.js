import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux" 
import gouvernorat from '../../../../constants/gouvernorat'
import villes from '../../../../constants/villes'  
import { Modal, Button } from "antd";
import { Form, Input, Select, InputNumber } from "antd";
import * as actions from '../../../../redux/actions/centers' 
import Draggable from 'react-draggable';

const AddCenter = () => {   
    
    const [disabled,setDisabled] = useState(true);
    const [bounds,setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = React.createRef();
    const isModalVisible = useSelector((state) => state.centers.displayed) 
    const [cities,setCities] = useState([])
    const [selectedGov,setSelectedGov] = useState('')
    const [selectedCity,setSelectedCity] = useState('') 
    const [name,setName] = useState('') 
    const [capacity,setCapacity] = useState(0) 
    const dispatch = useDispatch() 
    const handleCancel = () => {
      dispatch(actions.setDisplayed(false))  
    }; 
    
    const changeGov = (gover) => {
      setSelectedGov(gover);
      const found = villes.find((ville) => ville.gov === gover).cities 
      setCities(found ? found: []);
          
    }
  
    const changeCity = (value) => {
      setSelectedCity(value); 
    }
    const handleSubmit = async () =>{
      const center ={
        name, 
        governorate:selectedGov, 
        city:selectedCity,
        center_capacity:capacity,
        number_vaccine:capacity,
      } 
      dispatch(actions.addCenter(center)) 
    }
    const handleOk = e => {  
      dispatch(actions.setDisplayed(false))  
    };
   
  
    const onStart = (event, uiData) => {
      const { clientWidth, clientHeight } = window?.document?.documentElement;
      const targetRect = draggleRef?.current?.getBoundingClientRect();
      setBounds({
          left: -targetRect?.left + uiData?.x,
          right: clientWidth - (targetRect?.right - uiData?.x),
          top: -targetRect?.top + uiData?.y,
          bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        });
    };
 
	return (
    <Modal
    title={
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
        onMouseOver={() => {
          if (disabled) {
              setDisabled(false);
          }
        }}
        onMouseOut={() => {
          setDisabled(true);
        }}
        // fix eslintjsx-a11y/mouse-events-have-key-events
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        onFocus={() => {}}
        onBlur={() => {}}
        // end
      >
        Add center
      </div>
    }
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    modalRender={modal => (
      <Draggable
        disabled={disabled}
        bounds={bounds}
        onStart={(event, uiData) => onStart(event, uiData)}
      >
        <div ref={draggleRef}>{modal}</div>
      </Draggable>
    )}
  >
  <Form
          name="control-ref"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          
        >
          <Form.Item
            label="center_name:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="center_name" onChange={e => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="gouvernorat"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select value={selectedGov} onChange={changeGov}>
              <Select.Option>--Choose Governorate--</Select.Option>
              {gouvernorat?.map((gov, key) => {
                return <Select.Option key={key} value={gov} >{gov}</Select.Option>
              })}
              </Select>
          </Form.Item>
          <Form.Item
            label="city"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select value={selectedCity} onChange={changeCity}>
            <Select.Option>--Choose City--</Select.Option>
            {cities?.map((city, key) => {
              return <Select.Option key={key} value={city}>{city}</Select.Option>
            })}
            </Select>
          </Form.Item>
             
           
          <Form.Item
            label="center_capacity:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="capacity" /* value={capacity} */ onChange={e => setCapacity(e.target.value)}/>
          </Form.Item>

          <Button onClick={handleSubmit}> Add center </Button>
        </Form>
      
  </Modal>
		
		)
	 
}

export default AddCenter;
