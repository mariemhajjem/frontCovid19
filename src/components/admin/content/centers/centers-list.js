import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button,Modal  } from 'antd';
import Draggable from 'react-draggable';
import AddCenter from './add-center';

//originData is dummy data to nbadlouha wa9teli nzidou redux
const originData = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    center_name: `Edrward ${i}`,
    governorate: "32",
    city: `London Park no. ${i}`,
    center_capacity: 1000,
  });
}

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
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [visible,setVisible] = useState(false);
  const [disabled,setDisabled] = useState(true);
  const [bounds,setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = React.createRef();

  const showModal = () => {
    setVisible( true);
  };

  const handleOk = e => {
    console.log(e);
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
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      center_name: '',
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
      title: 'center_name',
      dataIndex: 'center_name',
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
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
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
      <Table
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
      />
    </Form>
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
            <AddCenter />
        </Modal>
        </>);
};
 

export default CentersList;
