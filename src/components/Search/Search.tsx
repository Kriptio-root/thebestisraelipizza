import React from "react";
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'

import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search:React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
            inputRef.current?.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
                dispatch(setSearchValue(str))
            },
            450),
        [],
    )

    const onChangeInput = (event:any) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px">
                <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"/>
                <path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"/>
                <path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z"
                      transform="rotate(-45.001 38.24 38.24)"/>
                <path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"/>
                <path fill="#BBDEFB"
                      d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Pizza search"/>

            {value && <svg
                onClick={onClickClear}
                className={styles.clearIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40" width="40px" height="40px">
                <path fill="#f78f8f"
                      d="M21 24.15L8.857 36.293 4.707 32.143 16.85 20 4.707 7.857 8.857 3.707 21 15.85 33.143 3.707 37.293 7.857 25.15 20 37.293 32.143 33.143 36.293z"/>
                <path fill="#c74343"
                      d="M33.143,4.414l3.443,3.443L25.15,19.293L24.443,20l0.707,0.707l11.436,11.436l-3.443,3.443 L21.707,24.15L21,23.443l-0.707,0.707L8.857,35.586l-3.443-3.443L16.85,20.707L17.557,20l-0.707-0.707L5.414,7.857l3.443-3.443 L20.293,15.85L21,16.557l0.707-0.707L33.143,4.414 M33.143,3L21,15.143L8.857,3L4,7.857L16.143,20L4,32.143L8.857,37L21,24.857 L33.143,37L38,32.143L25.857,20L38,7.857L33.143,3L33.143,3z"/>
            </svg>}
        </div>

    )

}

export default Search