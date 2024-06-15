"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import YouTubeVideo from '../components/YoutubeVideo';

const DailyRoutine = () => {
    const [isRotated, setIsRotated] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const [isRotatedTwo, setIsRotatedTwo] = useState(false)
    const [isClickedTwo, setIsClickedTwo] = useState(false)

    const [isRotatedThree, setIsRotatedThree] = useState(false)
    const [isClickedThree, setIsClickedThree] = useState(false)

    const handleClick = () => {
        setIsClicked(!isClicked)
    }
    const handleToggle = () => {
        setIsRotated(!isRotated)
    }

    const handleClickTwo = () => {
        setIsClickedTwo(!isClickedTwo)
    }

    const handleToggleTwo = () => {
        setIsRotatedTwo(!isRotatedTwo)
    }

    const handleClickThree = () => {
        setIsClickedThree(!isClickedThree)
    }

    const handleToggleThree = () => {
        setIsRotatedThree(!isRotatedThree)
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
                    <div className="mt-4 mx-auto w-4/5 bg-gradient-to-r bg-gray-200 rounded-lg shadow-md p-6 ">
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
                        {/*  <YouTubeVideo videoId={"TxwBvq7K3Jg"} />  */}
                    </div>
                ) :
                (<></>)

            }
            <div className="mt-4 mx-auto flex w-4/5 justify-between p-1 items-center bg-purple-200 shadow-lg shadow-gray-500/50">
                <p className='text-black  ml-4 text-lg '>
                    Second Trimester (Plan for 3-6 month)
                </p>
                <button type="button" className='outline_btn' onClick={handleClickTwo}>
                    <Image
                        src="/logos/dropdown-svgrepo-com.svg"
                        width={40}
                        height={40}
                        className={isRotatedTwo ? 'rotate-180' : 'rotate-0'}
                        onClick={handleToggleTwo}
                    ></Image>
                </button>
            </div>

            {isClickedTwo ? (
                <div className="mt-4 mx-auto w-4/5 bg-gradient-to-r bg-gray-200 rounded-lg shadow-md p-6 ">
                    <section className="text-black">
                        <h2 className="font-bold text-2xl mb-4">Do's</h2>
                        <h3 className='mb-2'>Parental Care</h3>
                        <p className="text-md leading-6 list-decimal">
                            <b> Regular Check-ups :</b> Keep all prenatal appointments to monitor your baby's growth and your health.
                        </p>
                        <p className='mt-2 text-md leading-6'>
                            <b>Screening test :</b> Complete any recommended screening tests, such as the anatomy scan around 20 weeks
                        </p>
                        <p className='mt-2 text-md leading-6'>
                            <b>Nutrient Intake :</b>  Focus on iron (to prevent anemia), calcium (for bone development), and folic acid (to prevent neural tube defects).
                        </p>
                        <p className='mt-2 text-md leading-6'>
                            <b>Drink Water :</b>  Stay well-hydrated by drinking plenty of water throughout the day.
                        </p>
                        <p className='mt-2 text-md leading-6'>
                            <b>Stay Active :</b>  Engage in regular, moderate exercise like walking, swimming, or prenatal yoga.
                        </p>
                        <p className='mt-2 text-md leading-6'>
                            <b>Pelvic Floor Excercises :</b>  Perform Kegel exercises to strengthen pelvic floor muscles.
                        </p>

                    </section>
                </div>
            ) : (<>
            </>)}
            <div className="mt-4 mx-auto flex w-4/5 justify-between p-1 items-center bg-purple-200 shadow-lg shadow-gray-500/50">
                <p className='text-black  ml-4 text-lg '>
                    Third Trimester (Plan for 6-9 month)
                </p>
                <button type="button" className='outline_btn' onClick={handleClickThree}>
                    <Image
                        src="/logos/dropdown-svgrepo-com.svg"
                        width={40}
                        height={40}
                        className={isRotatedThree ? 'rotate-180' : 'rotate-0'}
                        onClick={handleToggleThree}
                    ></Image>
                </button>
            </div>


            {isClickedThree ? (
                <div className="mt-4 mx-auto w-4/5 bg-gradient-to-r bg-gray-200 rounded-lg shadow-md p-6 ">
                    <section className="text-black">
                        <h2 className="font-bold text-xl mb-4">Your baby gains most weight in the third trimester, preparing for birth and rapid brain development.</h2>
                        <h3 className='text-lg font-bold mb-2'>Do's</h3>
                        <p className="text-md leading-6">
                            Our advice is to go sleep on your side in the third trimester because research has shown that this is safer for your baby.
                        </p>
                        <p className='mt-4 text-md leading-6'>
                            <ul className='list-disc list-inside'>
                                Tips for going to sleep on your side in the last three months of pregnancy
                                <li>
                                    Put a pillow or pillows behind your back to encourage side-sleeping.
                                </li>
                                <li>
                                    If you wake during the night, check your position and go back to sleep on your side.
                                </li>
                                <li>
                                Pay the same attention to sleep position during the day as you would during the night.
                                </li>
                            </ul>
                            
                         </p>
                         <YouTubeVideo videoId={"TxwBvq7K3Jg"}/>
                         <p className='mt-4 text-md leading-6'>
                            <h3 className='text-lg font-bold mb-2'>Do Monitor your baby's movements</h3>
                            <p className='mt-4 text-md leading-6'>
                                Feeling your baby move is a sign that they are well. You usually start to feel your baby moving when you’re between 18 and 24 weeks. If this is your first baby, you might not feel movements until after 20 weeks
                            </p>
                            <p className='mt-4 text-md leading-6'>
                            The movements can feel like a gentle swirling or fluttering. As your pregnancy progresses, you may feel kicks and jerky movements.                            </p>
                         </p>
                    </section>
                    </div>
                    ):(<> </>)}


                </div>

            )
}

            export default DailyRoutine;