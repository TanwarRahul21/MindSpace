import supabase from './supabaseClient.js'

const test = async () => {
  const { data, error } = await supabase
    .from('test')
    .select('*')

  console.log("DATA:", data)
  console.log("ERROR:", error)
}

test()