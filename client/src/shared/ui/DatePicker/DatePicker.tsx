"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Picker from "@/shared/assets/icons/picker.svg";
import s from "./DatePicker.module.scss";
import "./datepicker-styles.scss";
import Input from "@/shared/ui/Input/Input"
import {format} from "date-fns"
import {disableValidation} from "schema-utils"

interface DatePickerProps {
    value?: string
    onChange?: (value: string) => void
}
export const CustomDatePicker = ({ value, onChange }: DatePickerProps) => {
    const dateFromProps = value && new Date(Date.parse(value))
    const [startDate, setStartDate] = useState(dateFromProps || new Date())
    const onDateChange = (date: Date) => {
        setStartDate(date)
        onChange?.(format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"))
    }



    const CustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
        return (
            <div className={s.customHeader}>
                <div>{format(date, "MMMM yyyy")}</div>
                <div className={s.navigationButtons}>
                    <button className={s.navigationButton} onClick={decreaseMonth}>
                        &lt;
                    </button>
                    <button className={s.navigationButton} onClick={increaseMonth}>
                        &gt;
                    </button>
                </div>
            </div>
        );
    };
    return (
        <div className={s.datePickerWrapper}>

            <DatePicker
                selected={startDate}
                onChange={onDateChange}
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                customInput={
                    <div className={s.customInputWrapper}>
                        <Input
                            type="text"
                            className={s.dateInput}
                            onChange={() => {}}
                            value={startDate ? format(startDate, "dd/MM/yyyy") : ""}
                        />
                        <div className={s.datePickerIcon}>
                            <Picker />
                        </div>
                    </div>
                }
                renderCustomHeader={CustomHeader}
            />
        </div>
    );
};


