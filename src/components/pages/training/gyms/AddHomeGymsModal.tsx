import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';
import useTraining from '@/hooks/useTraining';
import { trainingHomesGymInitialData } from '@/validations/training.validations';
import { Modal } from '@/components/ui/modal';
import { action_types_list } from '@/constant/constant_data';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import { IsResponseSuccess, setFormField } from '@/utils/commonUtils';
import GlobalError from '@/components/ui/globalError/GlobalError';
import ModalCloseButton from '@/components/ui/button/ModalCloseButton';
import ModalSaveButton from '@/components/ui/button/ModalSaveButton';
import { validateAllLangFields } from '@/validations/common.validations';
import { createHomeGym } from '@/network/services/api-serices';
import { showSuccessToast } from '@/utils/toastUtils';
const errorHomesGyms = {
  name: "",
  title: "",
  address: "",
  global: ""
};

interface AddHomeGymsModalProps {
  ref_type: string;
  action_type: string;
  onClose: () => void;
  gymData: any;
}

const AddHomeGymsModal: FC<AddHomeGymsModalProps> = ({
  action_type,
  onClose,
  gymData
}) => {
  const isActionAdd = action_type === action_types_list.ADD;
  const { returnCurrentLocale, t_commmon, lang, t_errors } = useLocaleTranslation();
  const { loading, homeGymsData, handleSetHomeGymsData, handleSetLoading } = useTraining();
  const [formData, setFormData] = useState(trainingHomesGymInitialData);
  const [errors, setErrors] = useState(errorHomesGyms);



  useEffect(() => {
    if (!isActionAdd && gymData?._id) {
      setFormData({
      name: gymData?.name,
      title: gymData?.title,
      address: gymData?.address,
      location: gymData?.location
    })
    }

  }, [isActionAdd, gymData]);

  // @@ handle change
  const handleChange = (key: string, e: any) => {
    const value = e.target.value;
    setFormField(setFormData, key, value, lang);
    setFormField(setFormData, key, value, 'de');
    setErrors(prev => ({ ...prev, [key]: '', global: '' }));
  };



// @@ close model  and reset data
  const closeModal = () => {
    if (!loading) onClose();
  };


// @@ add and update api integrated
  const handleSubmit = async () => {

    console.log("formData", formData)
    if (loading) return;

    const validateName = validateAllLangFields(formData.name);
    const validateTitle = validateAllLangFields(formData.title);
    const validateAddress = validateAllLangFields(formData.address);

    if (!validateName || !validateTitle || !validateAddress) {
      setErrors(prev => ({
        ...prev,
        name: !validateName ? t_errors('requiredName') : '',
        title: !validateTitle ? t_errors('requiredTitle') : '',
        address: !validateAddress ? t_errors('requiredAddress') : '',
        global: ''
      }));
      return;
    }

    handleSetLoading(true);
    const res = await createHomeGym(formData);
    handleSetLoading(false)
    console.log("_res", res);
    if (IsResponseSuccess(res)) {
      const id = gymData?._id;
      const responseData = res?.data?.data;
      const items = isActionAdd ? [...(homeGymsData?.items || []), responseData] : homeGymsData?.items?.map((i: any) => (i?._id === id ? responseData : i));
      handleSetHomeGymsData({
        ...homeGymsData,
        items,
        total: (homeGymsData?.total || 0) + (isActionAdd ? 1 : 0),

      })
      showSuccessToast(res?.data?.message);
      closeModal();

    } else {

      setErrors((prev) => ({
        ...prev,
        global: res?.error || t_commmon("somethingWentWrong")
      }))
    }
  }


  // @@ returm modal title based on changes
  const modelTitle = useMemo(() => {
    const baseTitle = t_commmon('title_home_gyms');
    return `${isActionAdd ? t_commmon('add') : t_commmon('edit')} ${baseTitle}`;
  }, [isActionAdd, t_commmon]);


  return (
    <Modal isOpen={true} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
      <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            {modelTitle}
          </h5>
        </div>
        <GlobalError error={errors?.global} />
        <div >

          <div className="mt-6">
            <Label required>{t_commmon("name")} </Label>
            <Input
              name="name"
              type="text"
              placeholder={t_commmon('enterName')}
              onChange={(e: any) => handleChange('name', e)}
              value={returnCurrentLocale(formData.name)}
              error={!!errors?.name}
              hint={errors?.name}

            />
          </div>

          <div className="mt-6">
            <Label required>{t_commmon('title')} </Label>
            <Input
              name="title"
              type="textarea"
              placeholder={t_commmon("enterTitle")}
              onChange={(e: any) => handleChange('title', e)}
              value={returnCurrentLocale(formData.title)}
              error={!!errors?.title}
              hint={errors?.title}
            />
          </div>

          <div className="mt-6">
            <Label required>{t_commmon('address')} </Label>
            <Input
              name="address"
              type="text"
              placeholder={t_commmon("enterAddress")}
              onChange={(e: any) => handleChange('address', e)}
              value={returnCurrentLocale(formData.address)}
              error={!!errors?.address}
              hint={errors?.address}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <ModalCloseButton disabled={loading} onClick={closeModal} label={t_commmon('close')} />
          <ModalSaveButton
            loading={loading}
            onClick={handleSubmit}
            loadingLabe={t_commmon(isActionAdd ? 'saving' : 'updating')}
            label={t_commmon(isActionAdd ? 'add' : 'update')}


          />

        </div>
      </div>

    </Modal>
  );
};

export default AddHomeGymsModal;
