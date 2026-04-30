async function test() {
  try {
    const email = 'test' + Date.now() + '@example.com';
    console.log("1. Registering user:", email);
    const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nom: 'Test User', email: email, password: 'password123' })
    });
    const data = await res.json();
    const token = data.data.token;

    console.log("2. Submitting onboarding data...");
    await fetch('http://localhost:8000/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ profession: 'Dirigeant / CEO', type_entreprise: 'PME', objectif_principal: 'Gagner du temps' })
    });

    console.log("3. Testing Quota Logic (Max 3 invoices)...");
    for (let i = 1; i <= 4; i++) {
        const invRes = await fetch('http://localhost:8000/api/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ 
                client_id: 1, // assuming a client exists or this passes initial validation before our middleware
                date: '2026-04-30',
                due_date: '2026-05-30',
                status: 'draft',
                total: 100,
                items: []
            })
        });
        
        if (invRes.status === 403) {
            console.log(`Invoice ${i}: Blocked by Quota (403 Forbidden) as expected.`);
        } else {
            console.log(`Invoice ${i}: Allowed (Status ${invRes.status})`);
        }
    }

    console.log("4. Simulating Payment...");
    const payRes = await fetch('http://localhost:8000/api/subscription/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ abonnement: 'pro', amount: 199.00 })
    });
    const payData = await payRes.json();
    console.log("Payment status:", payData.success ? "Success" : "Failed");

    console.log("5. Testing 4th invoice after payment...");
    const invResPost = await fetch('http://localhost:8000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ 
            client_id: 1,
            date: '2026-04-30',
            due_date: '2026-05-30',
            status: 'draft',
            total: 100,
            items: []
        })
    });
    console.log(`Invoice 4 after payment: Status ${invResPost.status} (Should not be 403)`);

  } catch (e) {
    console.error(e.message);
  }
}

test();
