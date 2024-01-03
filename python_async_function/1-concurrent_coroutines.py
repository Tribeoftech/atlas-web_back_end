#!/usr/bin/env python3
"""
Import wait_random from the previous python file 
"""
from typing import List


wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """ wait_n should return the list of all the delays  """
    delays: List[float] = []

    for i in range(n):
        delays.append(await wait_random(max_delay))

    new_list: List[float] = []

    while delays:
        min = delays[0]  # arbitrary number in list
        for x in delays:
            if x < min:
                min = x
        new_list.append(min)
        delays.remove(min)

    return new_list