import React, { useState } from 'react';
import gouvernorat from '../../../../constants/gouvernorat'
import villes from '../../../../constants/villes'
import { Modal  } from 'antd';
import Draggable from 'react-draggable';

const AddCenter = ({visible,setVisible}) => {   
    const [cities,setCities] = useState([])
    const [selectedGov,setSelectedGov] = useState('--Choose Gov--')
    const [selectedCity,setSelectedCity] = useState('--Choose City--')
    const [disabled,setDisabled] = useState(true);
    const [bounds,setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = React.createRef();
    const handleOk = e => { 
      setVisible(false);
    };
  
    const handleCancel = e => {
      console.log(e);
      setVisible(false);
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
    visible={visible}
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
  <div id="container">
			<h2>Add center</h2> 
            <div>
                <label>Center name</label> <br />
                <input />
            </div> <br />
            <div>
                <label>Center capacity</label> <br />
                <input type="number" />
            </div><br />
	            <div>
					<label>Governorate</label> <br />
					<select placeholder="Governorate" value={selectedGov} onChange={changeGov}>
						<option>--Choose Governorate--</option>
						{gouvernorat?.map((gov, key) => {
							return <option key={key}>{gov}</option>;
						})}
					</select>
				</div><br />
                <div>
					<label>City</label> <br />
					<select placeholder="State" value={selectedCity} onChange={changeCity}>
						<option>--Choose State--</option>
						{cities?.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
					</select>
				</div>
				 
			</div>
      
  </Modal>
		
		)
	 
}

export default AddCenter;


/* import {  Form, Input, Button, Select  } from 'antd';
import { useState, useEffect } from 'react';
import gouvernorat from '../../../constants/gouvernorat'
import villes from '../../../constants/villes'
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const AddCenter = () => {
  const [form] = Form.useForm();
  const [gov,setGov] = useState('default')
  const [cities,setCities] = useState([])
  const onGovChange = (value) => {  console.log(value)
    setGov(value) ;
   
    setCities(villes.find(ville => ville.gov === value).cities);
  };
  const onCityChange = (value) => {
    console.log(value);
  };
  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  }; 
  useEffect(()=>{

  },[gov,cities])
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Center name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="governorate"
        label="governorate"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGovChange}
          value={gov}
          allowClear
        >
          { gouvernorat?.map((gov, key)=> <Option key={key} value={gov}>{gov}</Option> )}
          
        </Select>
      </Form.Item> 
      <Form.Item
        name="cities"
        label="cities"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onCityChange}
          allowClear
        >
          { cities?.map((city, key)=> <Option key={key} value={city}>{city}</Option> )}
          
        </Select>
      </Form.Item> 
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button> 
      </Form.Item>
    </Form>
  );
};
  
export default AddCenter;
 */