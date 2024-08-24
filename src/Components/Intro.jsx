import { UserIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Form } from 'react-router-dom'
import illustration from '../assets/illustration.jpg'

const Intro = () => {
    return (
        <div className='intro'>
            <div>
                <h1>
                    Take Control of <span className="accent">Your Money</span>
                </h1>
                <p>
                    Personal Budgeting is the secret to financial FreeDom.Start your journey today.
                </p>
                <Form method='post'>
                    <input type="text"
                        name="userName"
                        required
                        placeholder='What is your name?' a
                        ria-level="Your Name"
                        autoComplete='given-name'
                    />
                    <input type="hidden" name='_action'
                        value={'newUser'}/>
                    <button type='submit' className='btn btn--dark'>
                        <span>Create Account</span>
                        <UserIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Personal with money" width={600} />
        </div>
    )
}

export default Intro