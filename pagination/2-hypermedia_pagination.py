#!/usr/bin/env python3
"""
2. Hypermedia pagination

Copies in function named `index_range`
from pagination/0-simple_helper_function.py

Implement a method named `get_page` that takes two integer arguments
`page` with default value 1 - and - `page_size` with default value 10.

You have to use the CSV file `Popular_Baby_Names.csv`

Use assert to verify that both arguments are integers greater than 0.

Use index_range to find the correct indexes to paginate the dataset correctly
and return the appropriate page of the dataset (i.e. the correct list of rows).

If the input arguments are out of range for the dataset,
an empty list should be returned.
"""

import csv
import math
from typing import List, Tuple, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ calculate the start and end index for pagination

    Args:
        page (int): starting page number
        page_size (int): the number of items per page

    Returns:
        Tuple[int, int]: tuple of start and end index
    """

    end_index = page * page_size
    start_index = end_index - page_size
    return (start_index, end_index)
# end index_range method


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
# end __init__ method

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset
# end dataset method

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ get page of dataset

        Args:
            page (int, optional): current page number / or starting page.
            Defaults to 1.
            page_size (int, optional): number of items per page.
            Defaults to 10.

        Returns:
            List[List]: _description_
        """
        # check if page and page_size are valid integers > 0
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # check if dataset is empty
        if self.dataset() is None:
            return []

        # get start and end index for pagination using index_range
        start_index, end_index = index_range(page, page_size)
        # store dataset in variable
        dataset = self.dataset()

        # return empty list if start_index is greater than dataset length
        if start_index >= len(dataset):
            return []

        # return dataset list from start_index to
        # min(end_index, dataset length)
        # use min to avoid index out of range error
        # min will return the smallest value
        # if end_index is greater than dataset length
        return dataset[start_index:min(end_index, len(dataset))]
# end  get_page method

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """ get page of dataset with hypermedia pagination

        Args:
            page (int, optional): current page number / or starting page.
            Defaults to 1.
            page_size (int, optional): number of items per page.
            Defaults to 10.

        Returns:
            Dictionary containing the following key-value pairs:
            page_size: the length of the returned dataset page
            page: the current page number
            data: the dataset page (equivalent to return from previous task)
            next_page: number of the next page, None if no next page
            prev_page: number of the previous page, None if no previous page
            total_pages: the total number of pages in the dataset as an integer

        """
        # check if page and page_size are valid integers > 0
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # check if dataset is empty
        if self.dataset() is None:
            return []

        # get start and end index for pagination using index_range
        start_index, end_index = index_range(page, page_size)
        # store dataset in variable
        dataset = self.dataset()

        # return empty list if start_index is greater than dataset length
        if start_index >= len(dataset):
            return []

        # return dataset list from start_index to
        # min(end_index, dataset length)
        # use min to avoid index out of range error
        # min will return the smallest value
        # if end_index is greater than dataset length
        data = dataset[start_index:min(end_index, len(dataset))]
        # get total number of pages
        total_pages = math.ceil(len(dataset) / page_size)

        # return list of data and hypermedia pagination
        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": page + 1 if page < total_pages else None,
            "prev_page": page - 1 if page > 1 else None,
            "total_pages": total_pages
        }
# end get_hyper method