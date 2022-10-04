class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    //exclude expected query parameter keys
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    // enable complex filtering with mongodb operators
    //format eg price[gt]=45000 to return products with price above 45,000
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search() {
    if (this.queryString.search) {
      let searchKey = this.queryString.search;
      //make the search key case in-sensitive
      searchKey = searchKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      this.query = this.query.find({ $text: { $search: searchKey } });
    } else {
      this.query = this.query.find();
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      //where sort is not provided show latest products first
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    const excludedFields = "-__v -createdAt -updatedAt"; // these are excluded by defalult
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      this.query = this.query.select(excludedFields);
    } else {
      this.query = this.query.select(excludedFields);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
