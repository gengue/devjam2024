import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    if (userId === 'user_2nwG70hg9e4mDYqou0vrHlJdaTJ') {
      revalidatePath('/app/p') // Update cached posts
      redirect(`/app/p`)
    } else {
      revalidatePath('/app/') // Update cached posts
      redirect(`/app/`)
    }

  }
  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
}
