import { createClient } from '@supabase/supabase-js'

// ✅ YOUR DETAILS
const supabaseUrl = 'https://ojxtspyhvgxjjamrfxjk.supabase.co'
const supabaseKey = 'sb_publishable_-oV9Qw8vpmTLMeCGK9lUoQ_PlRYyUjT'

const supabase = createClient(supabaseUrl, supabaseKey)

// ✅ TEST FUNCTION
async function test() {
    const { data, error } = await supabase
        .from('test')
        .select('*')

    console.log("DATA:", data)
    console.log("ERROR:", error)
}

test()