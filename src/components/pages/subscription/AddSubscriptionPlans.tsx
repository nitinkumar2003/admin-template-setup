import React, { FC, useEffect, useMemo, useState } from 'react'
import { subscription_plan_initial } from '@/validations/initial.value'
import useSubscription from '@/hooks/useSubscription'
import { Modal } from '@/components/ui/modal';
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';
import { action_types_list } from '@/constant/constant_data';
import GlobalError from '@/components/ui/globalError/GlobalError';
import ModalCloseButton from '@/components/ui/button/ModalCloseButton';
import ModalSaveButton from '@/components/ui/button/ModalSaveButton';
import { IsResponseSuccess, setFormField } from '@/utils/commonUtils';
import Label from '@/components/form/Label';
import Input from '@/components/form/input/InputField';
import { IsRequiredValidate, priceValidate, validateAllLangFields } from '@/validations/common.validations';
import Select from '@/components/form/select/SelectField';

interface AddSubscriptionPlansProps {
  action_type: string,
  onClose: () => void;
  planData: any
}

const errorSubscription = {
  name: "",
  title: "",
  price: "",
  duration: "",
  global: ""
};


const AddSubscriptionPlans: FC<AddSubscriptionPlansProps> = ({ action_type, onClose, planData }) => {
  const isActionAdd = action_type === action_types_list.ADD;
  const [errors, setErrors] = useState(errorSubscription);
  const [formData, setFormData] = useState(subscription_plan_initial);


  const { loading, createUpdateSubscriptionPlan, handleSetLoading } = useSubscription()
  const { returnCurrentLocale, t_commmon, lang, t_errors } = useLocaleTranslation();

  useEffect(() => {
    if (!isActionAdd && planData) {
      setFormData({ ...planData })
    }
  }, [isActionAdd,planData])

  const handleChange = (key: string, e: any, lng?: any) => {
    const value = e.target.value;
    setFormField(setFormData, key, value, lng);
    if (lng) {
      setFormField(setFormData, key, value, 'de');
    }
    setErrors(prev => ({ ...prev, [key]: '', global: '' }));
  };




  const closeModal = () => {
    if (!loading) onClose();
  };


  const handleSubmit = async () => {
    const validateName = validateAllLangFields(formData.name);
    const validateTitle = validateAllLangFields(formData.title);
    const validtaeDuration = IsRequiredValidate(formData.duration)
    const isValidPrice = await priceValidate(formData.price);
    if (isValidPrice.error || !validateName || !validateTitle || !validtaeDuration) {
      setErrors(prev => ({
        ...prev,
        name: !validateName ? t_errors('requiredName') : '',
        title: !validateTitle ? t_errors('requiredTitle') : '',
        price: isValidPrice.error ? t_errors(isValidPrice.message) : '',
        duration: !validtaeDuration ? t_errors("durationRequired") : '',
        global: ''
      }));
      console.log("validation and requirement error")
      return;
    }
    handleSetLoading(true)
    const response: any = await createUpdateSubscriptionPlan(formData, planData?._id);
    handleSetLoading(false)
    if (!IsResponseSuccess(response)) {
      setErrors((prev) => ({
        ...prev,
        global: response?.error || t_commmon("somethingWentWrong")
      }))
      return;
    }

    closeModal();

  }

  // @@ returm modal title based on changes
  const modelTitle = useMemo(() => {
    const baseTitle = t_commmon('title_subscription');
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
              onChange={(e: any) => handleChange('name', e, lang)}
              value={returnCurrentLocale(formData.name)}
              error={!!errors?.name}
              hint={errors?.name}
            />
          </div>
          <div className="mt-6">
            <Label required>{t_commmon("title")} </Label>
            <Input
              name="title"
              type="text"
              placeholder={t_commmon('enterTitle')}
              onChange={(e: any) => handleChange('title', e, lang)}
              value={returnCurrentLocale(formData.title)}
              error={!!errors?.title}
              hint={errors?.title}
            />
          </div>
          
          <div className="mt-6">
            <Label required>{t_commmon("price")} </Label>
            <Input
              name="price"
              type="number"
              placeholder={t_commmon('enterPrice')}
              onChange={(e: any) => handleChange('price', e)}
              value={returnCurrentLocale(formData.price)}
              error={!!errors?.price}
              hint={errors?.price}
            />
          </div>
          <div className="mt-6">
            <Label required>{t_commmon("duration")}</Label>
            <Select
              name="duration"
              options={[
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
              placeholder={t_commmon('selectDuration')}
              onChange={(e: any) => handleChange('duration', e)}
              value={returnCurrentLocale(formData.duration)}
              error={!!errors?.duration}
              hint={errors?.duration}
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
  )
}

export default AddSubscriptionPlans

