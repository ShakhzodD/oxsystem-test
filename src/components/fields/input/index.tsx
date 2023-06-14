import { Input } from "antd";
import { FieldProps } from "formik";
import { get } from "lodash";
import { HTMLInputTypeAttribute } from "react";
interface Props extends FieldProps<any, any> {
  label?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  rootClassName?: string;
  isDisabled?: boolean;
}

const input = (props: Props) => {
  const {
    field: { value, name },
    label,
    className,
    placeholder = "Введите",
    type = "text",
    rootClassName,
    form: { setFieldValue, setFieldTouched, errors, touched },
    isDisabled,
  } = props;
  console.log(errors);

  return (
    <div className={rootClassName}>
      {label && (
        <p className="mb-1 text-base ant-label font-semibold">{label}</p>
      )}
      <div className={` ${className}`}>
        <Input
          type={type}
          size="large"
          onBlur={() => {
            !value && setFieldTouched(name, true);
          }}
          value={value}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`
            ${className}
            rounded-[4px]  
            placeholder:font-medium 
            placeholder:tracking-tighter 
          `}
          // dark:bg-gray-800
          // dark:border-[${touched[name] && errors[name] ? 'red' : 'transparent'}]
          // dark:placeholder:text-[#787993]
          // dark:text-[#cccccc]
          status={touched[name] && errors[name] ? "error" : ""}
          onChange={e => {
            setFieldValue(name, e.target.value);
          }}
        />
        {touched[name] && errors[name] && (
          <p className="text-xs font-semibold text-red-500 mb-0 mt-0">
            {get(errors, name, "").toString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default input;
