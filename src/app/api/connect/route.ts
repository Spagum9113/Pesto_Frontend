import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

// 1️⃣ Supabase Admin client (service-role key)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: 'Missing profile id' }, { status: 400 })
    }

    // 2️⃣ Fetch their email from your "profiles" table
    const { data, error } = await supabaseAdmin
        .from('PestoTestv1')
        .select('email, name')
        .eq('id', id)
        .single()

    if (error || !data) {
        return NextResponse.json({ error: error?.message || 'Not found' }, { status: 404 })
    }

    // 3️⃣ Send the email via Nodemailer (or any SMTP service)

    // testing the email and name that it pulls
    const email = data.email
    const name = data.name
    console.log('Pulled email from Supabase:', email)
    console.log('Pulled name from Supabase:', name)



    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT!),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: '"Pesto Connect" <noreply@pesto.app>',
            to: data.email,
            subject: '✨ Someone on Pesto wants to connect!',
            html: `
        <p>Hey ${data.name},</p>
        <p>Your fellow Pesto user just clicked “Connect” on your profile. Reply to this email to start chatting!</p>
        <p>— The Pesto Team</p>
      `,
        })
    } catch (mailErr) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
