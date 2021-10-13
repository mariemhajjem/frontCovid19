import React, { useState, useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button  } from 'antd'; 
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
  const [form] = Form.useForm();
  const centers = useSelector((state) => state.centers)
  const [data, setData] = useState(centers.list.map((center,key) =>({
    ...center,
    key: key.toString()
  })));
  const [editingKey, setEditingKey] = useState('');
  const [visible,setVisible] = useState(false);  
  const dispatch = useDispatch() 
  
  useEffect(() => {
    dispatch(actions.fetchCenters())  
  }, [])
  const showModal = () => {
    setVisible( true);
  }; 
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      governorate: '',
      city: '',
      center_capacity: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
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
              onClick={() => save(record.key)}
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
          <Button> Delete</Button>
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
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add center
        </Button>
        {visible && <AddCenter visible={visible} setVisible={setVisible} />}
      {centers &&<Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
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
