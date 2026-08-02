from django.core.management.base import BaseCommand

from shop.models import Product


PRODUCTS = [
    {
        "slug": "avena-calma",
        "name": "Avena Calma",
        "short_description": "Limpieza cremosa y delicada para piel sensible.",
        "description": "Una barra suave con avena coloidal que limpia sin dejar sensación tirante.",
        "price": 350,
        "stock": 12,
        "image": "products/img-6.webp",
        "category": "suaves",
        "ingredients": "Aceite de oliva, aceite de coco, manteca de karité y avena coloidal.",
        "benefit": "Calma y suaviza",
        "skin_type": "Sensible y seca",
        "weight_grams": 100,
        "is_featured": True,
    },
    {
        "slug": "miel-dorada",
        "name": "Miel Dorada",
        "short_description": "Espuma nutritiva con un aroma cálido y sutil.",
        "description": "Miel y manteca vegetal se combinan en una barra nutritiva para el uso diario.",
        "price": 375,
        "stock": 9,
        "image": "products/img-4.webp",
        "category": "nutritivos",
        "ingredients": "Miel, aceite de oliva, aceite de coco y manteca de cacao.",
        "benefit": "Nutre y protege",
        "skin_type": "Normal a seca",
        "weight_grams": 100,
        "is_featured": True,
    },
    {
        "slug": "coco-puro",
        "name": "Coco Puro",
        "short_description": "Una limpieza fresca, abundante y tropical.",
        "description": "Barra de espuma generosa con aceite de coco y un acabado limpio y fresco.",
        "price": 350,
        "stock": 14,
        "image": "products/img-2.webp",
        "category": "clasicos",
        "ingredients": "Aceite de coco, aceite de oliva y manteca de karité.",
        "benefit": "Limpia y refresca",
        "skin_type": "Normal y mixta",
        "weight_grams": 100,
        "is_featured": True,
    },
    {
        "slug": "naranja-viva",
        "name": "Naranja Viva",
        "short_description": "Cítrico luminoso para empezar el día.",
        "description": "Una barra alegre con notas de naranja dulce y una espuma sedosa.",
        "price": 375,
        "stock": 10,
        "image": "products/img-3.webp",
        "category": "aromaticos",
        "ingredients": "Aceite de oliva, aceite de coco, cúrcuma y naranja dulce.",
        "benefit": "Revitaliza",
        "skin_type": "Normal y mixta",
        "weight_grams": 100,
        "is_featured": False,
    },
    {
        "slug": "jardin-botanico",
        "name": "Jardín Botánico",
        "short_description": "Hierbas y arcillas para una pausa restauradora.",
        "description": "Una mezcla de romero y arcilla verde pensada para una limpieza profunda.",
        "price": 400,
        "stock": 8,
        "image": "products/img-1.webp",
        "category": "botanicos",
        "ingredients": "Aceite de oliva, romero, arcilla verde y manteca de karité.",
        "benefit": "Equilibra",
        "skin_type": "Mixta y grasa",
        "weight_grams": 100,
        "is_featured": False,
    },
    {
        "slug": "flor-de-ambar",
        "name": "Flor de Ámbar",
        "short_description": "Una barra floral, suave y especial para regalar.",
        "description": "Moldeada a mano con aceites vegetales y un aroma floral discreto.",
        "price": 425,
        "stock": 6,
        "image": "products/img-1_eCRfnXT.webp",
        "category": "regalos",
        "ingredients": "Aceite de oliva, manteca de cacao y mezcla aromática floral.",
        "benefit": "Suaviza",
        "skin_type": "Todo tipo de piel",
        "weight_grams": 95,
        "is_featured": False,
    },
]


class Command(BaseCommand):
    help = "Crea o actualiza el catálogo de demostración de Delicaté."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Desactiva productos anteriores antes de cargar el catálogo.",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            Product.objects.update(is_active=False, is_featured=False)

        created_count = 0
        for payload in PRODUCTS:
            _, created = Product.objects.update_or_create(
                slug=payload["slug"],
                defaults={**payload, "is_active": True},
            )
            created_count += int(created)

        self.stdout.write(
            self.style.SUCCESS(
                f"Catálogo listo: {len(PRODUCTS)} productos ({created_count} nuevos)."
            )
        )
