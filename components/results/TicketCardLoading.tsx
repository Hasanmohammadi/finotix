import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export default function TicketCardLoading() {
  return (
    <Stack>
      <div className="my-4 px-8 bg-white rounded-lg py-3 lg:flex justify-between hidden">
        <Skeleton
          variant="circular"
          width={80}
          height={80}
          sx={{ animationDuration: '0.6s' }}
        />
        <div className="flex gap-8">
          <Skeleton
            variant="rectangular"
            className="mt-3"
            width={60}
            height={60}
            sx={{ animationDuration: '0.6s' }}
          />
          <div className="mt-2.5">
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={{ animationDuration: '0.6s' }}
            />
            <Skeleton
              variant="text"
              width={200}
              height={30}
              sx={{ animationDuration: '0.6s' }}
            />
          </div>
          <Skeleton
            variant="rectangular"
            className="mt-3"
            width={60}
            height={60}
            sx={{ animationDuration: '0.6s' }}
          />
        </div>
        <div>
          <Skeleton
            variant="text"
            width={160}
            height={40}
            sx={{ animationDuration: '0.6s' }}
          />
          <Skeleton
            variant="text"
            width={160}
            height={40}
            sx={{ animationDuration: '0.6s' }}
          />
        </div>
      </div>
      <div className="my-4 px-4 bg-white rounded-lg py-4 lg:hidden justify-between flex">
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          sx={{ animationDuration: '0.6s' }}
          className="mt-3"
        />
        <div className="flex gap-8">
          <div>
            <Skeleton
              variant="text"
              width={130}
              height={30}
              sx={{ animationDuration: '0.6s' }}
            />
            <Skeleton
              variant="text"
              width={130}
              height={30}
              sx={{ animationDuration: '0.6s' }}
            />
          </div>
          <Skeleton
            variant="rectangular"
            className="mt-3"
            width={40}
            height={60}
            sx={{ animationDuration: '0.6s' }}
          />
        </div>
      </div>
    </Stack>
  )
}
