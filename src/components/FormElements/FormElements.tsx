import { Box, Button, Checkbox, FormControlLabel, FormGroup, Tooltip, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import {nanoid} from 'nanoid'
import Input from '../Input';
import { FormCtx } from '../../Context/FormContext';
import { useContext } from 'react';
import { Add } from '@mui/icons-material';

interface Props {
  element: 'text' | 'select' | 'checkbox' | 'toggle';
  valueType: string;
}

const InputText = ({element, valueType}: Props) => {
  const {handleSubmit, control} = useForm()
  const {setForm} = useContext(FormCtx)
  const onSubmit = (data: any) => {
    const value = {
      ...data,
      id: nanoid(12),
      type: valueType,
      elementType: element
    }
    setForm((prev) => {
      const newFields = [...prev.fields, value];
      return ({title: prev.title, fields: newFields})
    });
  }
  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4}}>
        <Box sx={{display: 'flex', gap: 2}}>
          <Input control={control} tooltipText="This will be shown to the user in text box" label='Label' type='text' required />
          <Input control={control} tooltipText="This will be the parameter sent to server" label='Name' type='text' required />
        </Box>
        <Box sx={{width: '50%'}}>
          {element === "text" ? <Input control={control} tooltipText="This will be the value of the element" label='Value' type={valueType} /> : null}
        </Box>
        {element === "select" ? <>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography fontSize="22px" >Options</Typography>
          <Button color="primary" variant='contained' sx={{minWidth: 'unset', width: '30px', height: '30px', borderRadius: '50%'}}><Add /></Button>
        </Box>
        <Box>
          
        </Box>
        </> : null}
        <Controller name={element === 'checkbox' ? 'checked' : 'required'} control={control} render={({field: {onChange, value = true}}) => (
          <FormControlLabel
            sx={{width: 'max-content'}}
            control={
              <Tooltip title="Set if this element is required">
                <Checkbox
                  color='primary'
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  value={""}
                />
              </Tooltip>
            }
            label={element === 'checkbox' ? 'Default checked' : 'Required'}
            />
        )} />
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Button variant='contained' type='submit' color="primary">Add Element</Button>
        </Box>
      </FormGroup>
    </form>
  )
}

export default InputText