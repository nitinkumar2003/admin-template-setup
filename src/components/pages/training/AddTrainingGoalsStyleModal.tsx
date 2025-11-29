"use clinet"
import React, { FC, useEffect, useMemo, useState } from 'react'
import { Modal } from '../../ui/modal'
import ModalSaveButton from '../../ui/button/ModalSaveButton'
import ModalCloseButton from '../../ui/button/ModalCloseButton'
import Label from '../../form/Label'
import Input from '../../form/input/InputField'
import { action_types_list, training_goals_style_types } from '@/constant/constant_data'
import { trainingGoalsStyleInitialData } from '@/validations/training.validations'
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation'
import { IsResponseSuccess, setFormField } from '@/utils/commonUtils'
import { validateAllLangFields } from '@/validations/common.validations'
import { createTrainingGoal, createTrainingStyles, updateTrainingGoal, updateTrainingStyles } from '@/network/services/api-serices'
import { showSuccessToast } from '@/utils/toastUtils'
import useTraining from '@/hooks/useTraining'
import GlobalError from '../../ui/globalError/GlobalError'
interface AddTrainingGoalsStyleModalProps {
  ref_type: string;
  action_type: string;
  onClose: () => void;
  trainingData: any
}
const AddTrainingGoalsStyleModal: FC<AddTrainingGoalsStyleModalProps> = ({ ref_type, action_type, onClose, trainingData }) => {
  const isActionAdd = action_type === action_types_list.ADD;
  const isRefGoals = ref_type === training_goals_style_types.goals;
  const { styleData, goalsData, loading, handleSetGoalsData, handleSetStyleData, handleSetLoading } = useTraining()
  const { returnCurrentLocale, t_commmon, lang, t_errors } = useLocaleTranslation()
  const [formData, setFormData] = useState(trainingGoalsStyleInitialData)
  const [errors, setErrors] = useState({ name: "", title: "", global: "" })

 //edit value prefill
  useEffect(() => {
    if (!isActionAdd && trainingData?._id) {
      setFormData({
        name: trainingData?.name,
        title: trainingData?.title,
        status: trainingData?.staus
      });
    }
  }, [isActionAdd, trainingData]);


 

  // Close modal handler
  const closeModal = () => {
    if(loading)return;
    onClose()
  };

  // @@ Modal title
  const modelTitle = useMemo(() => {
    const baseTitle = isRefGoals ? t_commmon("goal") : t_commmon("style");
    return `${isActionAdd ? t_commmon("add") : t_commmon("edit")} ${baseTitle}`;
  }, [isActionAdd, isRefGoals, t_commmon]);


  const handleChange = (key: string, e: any) => {
    const value = e.target.value;
    console.log("-value", value)
    setFormField(setFormData, key, value, lang);
    setFormField(setFormData, key, value, 'de')
    setErrors((prev: any) => ({
      ...prev,
      [key]: '',
      'global': "",
    }));


  }

  const handleErrors = (name: any, title: any, global: any) => {
    setErrors({
      name: name || '',
      title: title || '',
      global: global || '',
    })
  }

  console.log('_goalsData', goalsData)
  const handleSubmit = async () => {
    if(loading)return;
    const validateName = validateAllLangFields(formData.name);
    const validateTitle = validateAllLangFields(formData.title);
    console.log("_validateName", validateName, validateTitle)
    if (!validateName || !validateTitle) {
      handleErrors(!validateName ? t_errors('requiredName') : '', !validateTitle ? t_errors('requiredTitle') : '', '')
      return;
    }

    handleSetLoading(true)
    const id = trainingData?._id;
    const res = isRefGoals ? (isActionAdd ? await createTrainingGoal(formData) : await updateTrainingGoal(formData, id)) : (isActionAdd ? await createTrainingStyles(formData) : await updateTrainingStyles(formData, id));
    handleSetLoading(false)
    if (IsResponseSuccess(res)) {
      const setData = isRefGoals ? handleSetGoalsData : handleSetStyleData;
      const data = isRefGoals ? goalsData : styleData;
      const responseData = res?.data?.data;
      console.log("_responseData", responseData)
      const items = isActionAdd ? [...(data?.items || []), responseData] : data?.items?.map((i: any) => (i?._id === id ? responseData : i));

      setData({
        ...data,
        items,
        total: (data?.total || 0) + (isActionAdd ? 1 : 0),
      });

      showSuccessToast(res?.data?.message);
      closeModal();
    } else {
      handleErrors("", "", res?.error);
    }


  }



  console.log('_errors', errors);
  console.log("_trainingData", isActionAdd, trainingData)

  return (
    <>
      <Modal
        isOpen={true}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {modelTitle}
            </h5>
          </div>
          {errors?.global && <p id={''} className={'text-error-500 mt-1.5 text-xs'}>{errors?.global}</p>}
         <GlobalError error={errors?.global}  />
          <div >

            <div className="mt-6">
              <Label required >{t_commmon("name")} </Label>
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
    </>
  )
}

export default AddTrainingGoalsStyleModal