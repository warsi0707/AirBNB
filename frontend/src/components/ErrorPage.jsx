
export default function ErrorPage() {
  return (
    <div className='h-full'>
      <div className='bg-gray-300 my-10 h-96 w-auto mx-2 md:w-[700px] rounded-xl md:mx-auto flex flex-col gap-8 justify-center items-center'>
        <h1 className='text-4xl font-bold md:text-8xl '>404</h1>
        <p className='text-lg italic md:text-2xl'>Page not found</p>
      </div>
    </div>
  )
}
