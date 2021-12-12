import { client, Query, Field } from "@tilework/opus";

client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);

export const apiGetCategories = async () => {
  const query = new Query("categories", true).addFieldList(["name"]);
  let result = [];
  try {
    result = await client.post(query);
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const apiGetCurrencies = async () => {
  const query = new Query("currencies", true);
  let result = [];
  try {
    result = await client.post(query);
  } catch (error) {
    console.log(error);
  }
  return result.currencies;
};

export const apiGetProductsByCategory = async (name) => {
  const productFields = ["name", "id", "gallery", "description", "brand"];
  const query = new Query("category", false)
    .addArgument("input", "CategoryInput", { title: name })
    .addField(
      new Field("products", true)
        .addFieldList(productFields)
        .addField(
          new Field("prices", true).addFieldList(["currency", "amount"])
        )
        .addField(
          new Field("attributes", true)
            .addFieldList(["name", "type"])
            .addField(
              new Field("items", true).addFieldList([
                "displayValue",
                "value",
                "id",
              ])
            )
        )
    );

  let result = [];
  try {
    result = await client.post(query);
  } catch (error) {
    console.log(error);
  }

  return result.category.products;
};

export const apiGetProductById = async (id) => {
  const productFields = ["name", "id", "gallery", "description", "brand"];
  const query = new Query("product", false)
    .addArgument("id", "String!", id)
    .addFieldList(productFields)
    .addField(new Field("prices", true).addFieldList(["currency", "amount"]))
    .addField(
      new Field("attributes", true)
        .addFieldList(["name", "type"])
        .addField(
          new Field("items", true).addFieldList(["displayValue", "value", "id"])
        )
    );
  let result = [];
  try {
    result = await client.post(query);
  } catch (error) {
    console.log(error);
  }
  console.log("result.product: ", result.product);
  return result.product;
};
