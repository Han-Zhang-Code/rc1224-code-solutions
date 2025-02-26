select "addresses"."line1", "addresses"."district","cities"."name","countries"."name"
from "addresses" join "cities" using ("cityId") join "countries" using ("countryId")
