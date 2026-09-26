# Launch checklist

This checklist separates what the code already guarantees from the decisions the business must confirm before selling to real customers.

## Catalog and brand

- Replace any demo photo or copy with content approved by the brand.
- Confirm the name, price, stock, weight, ingredients and skin type of every product.
- Check that every claim is cosmetic and does not promise to treat medical conditions.
- Add real contact details, response hours and delivery areas.
- Test a complete order with the number `18498625049` from Android and iPhone.

## Customer service

- Write down delivery costs and times, and the policy for exchanges, returns and damaged products.
- Prepare WhatsApp replies to confirm availability, address, payment method and delivery.
- Tell customers that the cart total is an estimate until the order is confirmed.
- Decide who reviews messages, how often, and how stock is updated after a sale.

## Privacy and compliance

- Publish a privacy policy that reflects the data actually collected.
- Publish purchase terms and an exchange policy that apply in the Dominican Republic.
- Get consent before using newsletter emails for marketing.
- Avoid storing medical or sensitive information in contact messages.

## Infrastructure

- Use `DJANGO_DEBUG=False`, a unique `DJANGO_SECRET_KEY` and real HTTPS domains.
- Configure PostgreSQL through `DATABASE_URL`, with automatic backups.
- Configure persistent storage for the images uploaded from Django Admin.
- Restrict access to the admin panel and enable multi-factor authentication with the hosting provider.
- Keep `VITE_ENABLE_DEMO_CATALOG=false` so no fictional stock is shown if the API fails.
- Set up uptime and error monitoring before announcing the site.

## Final validation

```powershell
python backend\manage.py check
python backend\manage.py test
python backend\manage.py makemigrations --check --dry-run
cd frontend
npm ci
npm run lint
npm run build
```

Finally, test navigation, product details, the cart, quantities, sold-out products and the WhatsApp link at widths of 390, 768, 1024 and 1440 pixels.
