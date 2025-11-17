import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.actions';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}:RouteParams) => {
  const {id}=await params;
  const user=await getCurrentUser();
  const interview=await getInterviewById(id);

  if(!interview) redirect('/');

  const feedback=await getFeedbackByInterviewId({
    interviewId:id,
    userId:user?.id!,
  })

  const formattedDate=dayjs(feedback?.createdAt).format("MMM D,YYYY - hh:mm A ")
  console.log(feedback);

  const strengthsArray = feedback?.strengths.split(".").map(s => s.trim());
  strengthsArray?.pop();
  const improvementArray = feedback?.areasForImprovement.split(".").map(s => s.trim());
  improvementArray?.pop();

  return (
    <section>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-5'>
          <h1 className='font-bold text-2xl'>Feedback on the Interview -<span className='capitalize'> {interview.role}</span> Interview</h1>
          <div className='flex justify-between text-primary-100'>
            <div className='flex gap-3'>
              <Image src="/star.svg" alt="star-icon" width={20} height={20}/>
              <span className='text-md lg:text-lg '>Overall Impression: {feedback?.totalScore}/100</span>
            </div>
            <div className='flex gap-3'>
              <Image src="/calendar.svg" alt="calendar-icon" width={20} height={20}/>
              <span className='text-sm md:text-md lg:text-lg '>{formattedDate}</span>
            </div>
          </div>

          <hr className='bg-primary-100'/>

          <p className='lg:text-lg text-gray-200'>{feedback?.finalAssessment}</p>

        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-xl text-gray-100'>Breakdown of the Interview</h2>
          {Object.entries(feedback?.categoryScores).map(([key, value],index) => (
            <div key={key}>
              <h3 className='text-lg mb-1.5 text-gray-200'>{`${index+1}. ${value.name} `}<span>({value.score}/100)</span></h3>
              <p className='text-gray-300'>{value.comment}</p>
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-xl'>Strengths</h2>
          <ul>
            {strengthsArray?.map((area,index)=>(
              <li key={index} className='text-green-200'>{area}</li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-xl'>Areas for Improvement</h2>
          <ul>
            {improvementArray?.map((area,index)=>(
              <li className='text-red-200' key={index}>{area}</li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-2 items-end md:flex-row '>
          <Button className='btn-secondary flex-1'>
            <Link href={"/"} className="flex w-full justify-center">
              <p className='text-sm font-semibold'>Back to Dashboard</p>
            </Link>
          </Button>

          <Button className='btn-primary flex-1'>
            <Link href={`/interview/${id}`} className="flex w-full justify-center">
              <p className='text-sm font-semibold text-dark-200'>Retake Interview</p>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default page
