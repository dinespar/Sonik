import React from 'react'
import DashboardPage from '@/components/global/dashboard-page'
import { checkUser } from '@/lib/chekckUser';

async function page() {
  await checkUser();

  return (
    <div><DashboardPage /></div>
  )
}

export default page