import React, { useState, useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Spin, Alert, Space} from 'antd'; 
import { useDispatch, useSelector } from "react-redux"
import * as actions from '../../../../redux/actions/centers'
import AddCenter from './add-center'; 

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CentersList = () => {
  const isAddVisible = useSelector((state) => state.centers.displayed) 
  const errors = useSelector((state) => state.centers.errors)  
  const [form] = Form.useForm();
  const centers = useSelector((state) => state.centers) 
  const [editingKey, setEditingKey] = useState(''); 
  const dispatch = useDispatch() 
  
  useEffect(() => {
    dispatch(actions.fetchCenters())  
  }, [])
   
  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      governorate: '',
      city: '',
      center_capacity: '',
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try { 
      const row = await form.validateFields(); 
      console.log('row edited :',row)
      row.id=id
      console.log('row edited with id:',row) 
      dispatch(actions.updateCenter(row)) 
      setEditingKey(''); 
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'governorate',
      dataIndex: 'governorate',
      width: '15%',
      editable: true,
    },
    {
      title: 'city',
      dataIndex: 'city',
      width: '40%',
      editable: true,
    }, 
    {
        title: 'center_capacity',
        dataIndex: 'center_capacity',
        width: '40%',
        editable: true,
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="text"
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (text, record) => (
          <Button onClick={() =>dispatch(actions.deleteCenter(record.name))}> Delete</Button>
        ),
      },
  ];
  
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'center_capacity' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
      <>
    <Form form={form} component={false}>
        <Button
          onClick={()=>dispatch(actions.setDisplayed(true))}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add center
        </Button>
        <br />
      { isAddVisible && <AddCenter /> }
      
      {centers.loading &&  <Space size="middle"><Spin size="large" /></Space>}
      {errors &&  <Alert
        message="Error Text"
        showIcon
        description="Error 500 || 400"
        type="error"
        action={
          <Button size="small" danger>
            Detail
          </Button>
        }
        closable
      />}
      {!centers.loading && !errors && centers.list && <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowKey={record => record._id}
        dataSource={centers.list}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />}
    </Form>
        </>);
};
 

export default CentersList;
