
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type T=any

interface FormFieldProps<T extends FieldValues>{
    control:Control<T>;
    name:Path<T>;
    label:string;
    placeholder?:string;
    type?:'text'|'email'|'password'|'file'
}

const FormField = ({control,name,label,placeholder,type="text"}:FormFieldProps<T>) => {
  return (
    <Controller defaultValue="" name={name} control={control} render={({field})=> (
        <FormItem>
            <FormLabel>{name}</FormLabel>
            <FormControl>
            <Input placeholder={placeholder} {...field} type={type}/>
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
  )
}

export default FormField
