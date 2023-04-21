const useFetchPerson = (personInfo, ssn) => {
    if (personInfo) {
        return {
            data: personInfo,
            loading: false,
            isError: false,
            error: null,
        };
    }
};

export default useFetchPerson;
