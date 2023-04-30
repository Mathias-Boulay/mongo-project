import { Modal } from 'antd';
import { useState } from 'react';
import { EditForms } from '../components/EditForms';
import { FormDto } from '../models/form.model';
import { createForm } from '../utils/api';

export function CreateFormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');

  const handleCreateForm = async (form: FormDto) => {
    const result = await createForm(form);
    console.log(result);
    setId(result._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <EditForms onFormCreated={handleCreateForm} />
      <Modal title='Basic Modal' open={isModalOpen}>
        <p>
          {window.location.host}/{id}/submit
        </p>
      </Modal>
    </div>
  );
}
