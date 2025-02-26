select "countries"."name",
       count(*) as "Total Cities"
  from "cities"
  join "countries" using ("countryId")
  group by "countries"."countryId";
