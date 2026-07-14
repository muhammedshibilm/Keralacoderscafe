import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Job Opportunity at KCC';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Fetch data
  const res = await fetch(`https://api.interviewkit.online/api/jobs/${params.slug}/`);
  const job = res.ok ? await res.json() : null;

  if (!job) {
    return new ImageResponse(
      (
        <div style={{
          display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC'
        }}>
          <h1 style={{ fontSize: '60px', color: '#0F172A' }}>KCC Careers</h1>
        </div>
      ),
      { ...size }
    );
  }

  const cleanTitle = job.title.replace(new RegExp(`\\s+at\\s+${job.company}`, "i"), "");

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0F172A', // Dark Slate Blue background
          color: '#F8FAFC',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '90px', 
            height: '90px', 
            backgroundColor: '#00B9A5', 
            borderRadius: '24px', 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: 'white',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            {job.logo ? job.logo.substring(0, 3) : "KCC"}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '32px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#00B9A5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>JOB OPPORTUNITY</span>
            <span style={{ fontSize: '36px', color: '#94A3B8', marginTop: '10px' }}>Kerala Coders Cafe</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <h1 style={{ fontSize: '80px', fontWeight: '900', margin: '0', lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {cleanTitle}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', gap: '24px' }}>
            <div style={{ display: 'flex', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '32px', color: '#F1F5F9', fontWeight: 'bold' }}>
              {job.company}
            </div>
            <div style={{ display: 'flex', padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '32px', color: '#CBD5E1' }}>
              {job.location}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
