import { Form, message, ModalProps } from 'antd';
import useErrors from 'hooks/useErrors';
import { Button, Input, Modal, TextArea, ValidationLine } from 'lib';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useUpdateProfileMutation } from 'store/api/user';
import { UserProfileT, UserT } from 'types';
import { getUserAvatar, getUserFullName, splitFullName } from 'utils';
import * as yup from 'yup';

type ProfileUpdateModalProps = {
  profile?: UserProfileT & { user: Omit<UserT, 'profile'> };
} & ModalProps;

export default function ProfileUpdateModal({
  profile,
  ...props
}: ProfileUpdateModalProps) {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { errors, clearError, validateForm } = useErrors();

  useEffect(() => {
    form.setFieldsValue({
      fullname: getUserFullName(profile?.user),
      username: profile?.user.username,
      bio: profile?.bio,
    });
  }, []);

  const handleFormSubmit = () => {
    const values = form.getFieldsValue();
    validateForm({
      data: values,
      onOk: async () => {
        try {
          const { first_name, last_name } = splitFullName(values.fullname);
          await updateProfile({
            first_name,
            last_name,
            username: values.username,
            bio: values.bio,
          }).unwrap();

          if (props.onCancel) {
            props.onCancel('' as any);
          }
        } catch (err) {
          message.error('Something went wrong while profile update');
        }
      },
      schema: profileSchema,
    });
  };

  return (
    <Modal destroyOnClose styles={{ content: { padding: 0 } }} {...props}>
      <Form form={form} className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-5">
            <IoClose
              className="text-2xl font-bold cursor-pointer"
              onClick={props.onCancel as any}
            />
            <h4 className="font-semibold text-lg">Edit profile</h4>
          </div>
          <Button
            className="rounded-full py-1.5"
            loading={isLoading}
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <img
            src={getUserAvatar()}
            alt="user"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <Form.Item name="fullname" noStyle>
              <Input label="Name" onChange={() => clearError('fullname')} />
            </Form.Item>
            <ValidationLine text={errors['fullname']} />
          </div>
          <div>
            <Form.Item name="username" noStyle>
              <Input label="Username" onChange={() => clearError('username')} />
            </Form.Item>
            <ValidationLine text={errors['username']} />
          </div>
          <Form.Item name="bio" noStyle>
            <TextArea label="Bio" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

const profileSchema = yup.object().shape({
  fullname: yup.string().required('Please input your name!'),
  username: yup.string().required('Please input your username!'),
});
