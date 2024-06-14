"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import YouTubeVideo from '../components/YoutubeVideo';

const DailyRoutine = () => {
    const [isRotated, setIsRotated] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const handleToggle = () => {
        setIsRotated(!isRotated)
    }

    const handleClick = () => {
        setIsClicked(!isClicked)
    }


    return (
        <div>
            <h1 className='mt-4 text-center text-xl font-extrabold '>Daily Routine For Pregnant Lady</h1>
            <div className="mt-4 mx-auto flex w-4/5 justify-between p-1 items-center bg-purple-200 shadow-lg shadow-gray-500/50">
                <p className='text-black  ml-4 text-lg '>
                    First Trimester (Plan for 0 - 3 month)
                </p>
                <button type="button" className='outline_btn' onClick={handleClick}>
                    <Image
                        src="/logos/dropdown-svgrepo-com.svg"
                        width={40}
                        height={40}
                        className={isRotated ? 'rotate-180' : 'rotate-0'}
                        onClick={handleToggle}
                    ></Image>
                </button>

            </div>

            {isClicked ?
                (
<<<<<<< HEAD
                    <div className="mt-4 mx-auto w-4/5 bg-gradient-to-r bg-grey-200 rounded-lg shadow-md p-6 ">
=======
                    <div className="mt-4 mx-auto w-4/5 bg-gradient-to-r bg-gray-200 rounded-lg shadow-md p-6 ">
>>>>>>> 9909ff46de9d29fd3b4ae706736d86874c7b2dc8
                        <section className="text-black">
                            <h2 className="font-bold text-2xl mb-4">Do's</h2>
                            <p className="text-md leading-6">
                                Folic acid significantly reduces your baby’s risk of neural tube defects, such as spina bifida. If you are pregnant, start taking 400 micrograms of folic acid as a supplement as soon as possible until the end of the first trimester (week 12 of your pregnancy).
                            </p>
                            <p className='mt-2 text-md leading-6'>
                                You are also recommended to take a <span className='font-bold'>Vitamin D </span>
                                during pregnancy and during breastfeeding. This helps your baby develop <b> healthy bones</b> , <b> teeth </b>and <b> muscles</b> .
                            </p>
                            <h2 className="mt-4 font-bold text-2xl mb-4">Dont's</h2>
                            <p className="text-md leading-6">
                                <b >   DON'T 'eat for two' </b>
                                <br />
                                <p className='mt-2'>
                                    Your baby will take all they need from you as they grow, so there’s no need for extra calories in the first or second trimester. In the third trimester, you might need an extra 200 calories if you are active. This is the equivalent to around half a sandwich.
                                </p>
                            </p>
                            <p className="mt-2 text-md leading-6">
                            <b >  DON'T overdo caffeine </b>
                                <p className='mt-2'>
                                Limit caffeine intake during pregnancy due to risks. NHS advises less than 200mg daily, equivalent to about 2 cups of instant coffee.
                                </p>
                            </p>
                            <p className="mt-2 text-md leading-6">
                            <b >  DON'T smoke </b>
                                <p className='mt-2'>
                                If you smoke, quitting is one of the best things you can do for you and your baby
                                Smoking during pregnancy increases the risk of serious complications in pregnancy, including <b>miscarriage</b>, <b>stillbirth </b>
                                 and <b> premature birth</b>
                                </p>
                            </p>
                            <p className="mt-2 text-md leading-6">
                            <b >  DON'T drink alcohol </b>
                                <p className='mt-2'>
                                Drinking in pregnancy can lead to long-term harm to the baby. The more you drink, the greater the risk. There is no known <b>safe level </b>for drinking alcohol during pregnancy, so it's best to avoid it completely during pregnancy.
                                </p>
                            </p>
                            
                        </section>
                      <YouTubeVideo videoId={"TxwBvq7K3Jg"} /> 
                    </div>
                ) :
                (<></>)
            }
            


        </div>

    )
}

export default DailyRoutine;