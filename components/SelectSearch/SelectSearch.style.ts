import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const SelectSearchContainerStyled = styled(Box)`
  .MuiInputBase-root {
    padding: 3px;
    border-radius: 8px;
    padding-left: 8px;
  }

  &.disabled {
    background: #efefef;
  }

  .css-r9jtuy-MuiAutocomplete-root
    .MuiOutlinedInput-root
    .MuiAutocomplete-input {
    font-size: 14px;
  }

  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-r9jtuy-MuiAutocomplete-root
    .MuiOutlinedInput-root {
    padding-right: 34px;
    padding-left: 2px;
  }
` as typeof Box

export default SelectSearchContainerStyled
