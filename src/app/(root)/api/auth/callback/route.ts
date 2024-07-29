import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      console.log('Code exchanged successfully, redirecting to:', `${origin}${next}`)
      return NextResponse.redirect(`${origin}/signup`)
    } else {
      console.error('Error exchanging code for session:', error.message)
      
      if (error.message.includes('Database error')) {
        console.error('Database error saving new user:', error.message)
      }
    }
  } else {
    console.warn('No code found in the request URL')
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}