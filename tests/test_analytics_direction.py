import unittest

import numpy as np

from backend.services.analytics import Analytics


class AnalyticsDirectionTests(unittest.TestCase):
    def test_image_relative_bearing_uses_north_clockwise_orientation(self):
        analytics = Analytics()
        current = np.zeros((256, 256), dtype=np.uint8)
        future = np.zeros((256, 256), dtype=np.uint8)

        current[120:140, 120:140] = 1
        future[100:120, 120:140] = 1

        distance, bearing = analytics.calculate_spread_distance_and_direction(current, future)

        self.assertGreater(distance, 0)
        self.assertTrue((0 <= bearing <= 10) or (350 <= bearing <= 360))

    def test_empty_masks_return_no_direction(self):
        analytics = Analytics()
        empty = np.zeros((32, 32), dtype=np.uint8)

        distance, bearing = analytics.calculate_spread_distance_and_direction(empty, empty)

        self.assertEqual(distance, 0.0)
        self.assertEqual(bearing, 0.0)


if __name__ == "__main__":
    unittest.main()
