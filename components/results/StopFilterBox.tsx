import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { useDispatch } from 'react-redux'
import { setArrivalStops, setDepartureStops } from '../../airportsSlice'
import { useAppSelector } from '../../hooks'

const stopFilters = [
  { id: 1, text: 'Non-Stop' },
  { id: 2, text: 'One-Stop' },
  { id: 3, text: 'two-Stops' },
]

const StopFilterBox = () => {
  const dispatch = useDispatch()

  const { departureStops, tripType, arrivalStops } = useAppSelector(
    (state) => state.airportsInfo
  )

  const onAddDepartureStop = (value: number) => {
    if (!departureStops.includes(value)) {
      dispatch(setDepartureStops([...departureStops, value]))
    }
  }
  const onRemoveDepartureStop = (value: number) => {
    const x = [...departureStops]
    const y = x.filter((stop) => stop !== value)
    dispatch(setDepartureStops(y))
  }

  const onAddArrivalStop = (value: number) => {
    if (!arrivalStops.includes(value)) {
      dispatch(setArrivalStops([...arrivalStops, value]))
    }
  }
  const onRemoveArrivalStop = (value: number) => {
    const x = [...arrivalStops]
    const y = x.filter((stop) => stop !== value)
    dispatch(setArrivalStops(y))
  }

  return (
    <>
      <Box
        className="px-4  pb-0.5"
        sx={{
          ['.MuiFormControlLabel-root']: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            margin: 0,
          },
        }}
      >
        {tripType === 'Round-trip' && (
          <p className="font-semibold text-sm">Departure Stop:</p>
        )}
        <FormGroup>
          {stopFilters.map(({ id, text }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  name={text}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onAddDepartureStop(id)
                    } else {
                      onRemoveDepartureStop(id)
                    }
                  }}
                />
              }
              label={text}
            />
          ))}
        </FormGroup>
      </Box>
      {tripType === 'Round-trip' && (
        <Box
          className="px-4 mt-4 border-t border-t-gray-200"
          sx={{
            ['.MuiFormControlLabel-root']: {
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
              margin: 0,
            },
          }}
        >
          <p className="font-semibold text-sm">Arrival Stop:</p>

          <FormGroup>
            {stopFilters.map(({ id, text }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    name={text}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onAddArrivalStop(id)
                      } else {
                        onRemoveArrivalStop(id)
                      }
                    }}
                  />
                }
                label={text}
              />
            ))}
          </FormGroup>
        </Box>
      )}
    </>
  )
}

export default StopFilterBox
