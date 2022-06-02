import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { FormErrorMessage } from "./FormErrorMessage";
import { DatePickerField } from "./DatePickerField";

export const AppFormDatePicke = ({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <DatePickerField
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({});
