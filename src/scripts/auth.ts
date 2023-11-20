import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
)

export async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

function getParameterByName(nameParam: string, url = window.location.href) {
  const name = nameParam.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export async function login() {
  const access_token = getParameterByName('access_token')
  const refresh_token = getParameterByName('refresh_token')

  if (access_token && refresh_token) {
    console.log('setting session')
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })
    if (error) {
      console.error(error)
      return
    }
    console.log('redirecting')
    location.href = '/create'
  } else {
    location.href = '/magic'
  }
}



