import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { useDispatch } from 'react-redux'
import { setAirlineSelectedFilter } from '../../airportsSlice'
import { useAppSelector } from '../../hooks'

const AirlineFilterBox = () => {
  const dispatch = useDispatch()

  const { opratorDetails, airlineSelectedFilter } = useAppSelector(
    (state) => state.airportsInfo
  )

  const onAddAirLine = (value: string) => {
    if (!airlineSelectedFilter.includes(value)) {
      dispatch(setAirlineSelectedFilter([...airlineSelectedFilter, value]))
    }
  }
  const onRemoveAirline = (value: string) => {
    const x = [...airlineSelectedFilter]
    const y = x.filter((airline) => airline !== value)
    dispatch(setAirlineSelectedFilter(y))
  }

  return (
    <Box
      sx={{
        ['.MuiFormControlLabel-root']: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
        },
      }}
    >
      <FormGroup>
        {opratorDetails.map(({ opratorCode, opratorName }) => (
          <FormControlLabel
            key={opratorCode}
            control={
              <Checkbox
                // checked={airlineSelectedFilter.includes(opratorName)}
                name={opratorName}
                onChange={(e) => {
                  if (e.target.checked) {
                    onAddAirLine(opratorCode)
                  } else {
                    onRemoveAirline(opratorCode)
                  }
                }}
              />
            }
            label={opratorName}
          />
        ))}
      </FormGroup>
    </Box>
  )
}

export default AirlineFilterBox
