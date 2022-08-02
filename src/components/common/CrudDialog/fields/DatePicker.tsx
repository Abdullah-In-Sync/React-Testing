const DatePicker = () => {
  return (
    <>
      <div className="inputDatePicker">
        {/* <ReactDatePicker
                    selected={isValidDate(new Date(fieldValues[field.key]))? new Date(fieldValues[field.key]) : ""}
                    onChange={handleDateChange}
                    className="mb-3"
                    dateFormat={"dd-MM-yyyy"}
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: '5px, 10px'
                        },
                    }}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText={field.label? field.label : "DD-MM-YYYY"}
                /> */}
      </div>
    </>
  );
};

export default DatePicker;
