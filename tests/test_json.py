import unittest
import os
import json


project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_filename = os.path.join(project_root, "tools.json")


class JsonTestCase(unittest.TestCase):

    def get_json_string(self):
        with open(json_filename) as stream:
            return stream.read()

    def test_valid_json(self):
        """make sure this is a valid json"""
        # http://stackoverflow.com/a/20725965/564709
        json_string = self.get_json_string()
        try:
            json.loads(json_string)
        except Exception, e:
            self.fail('json invalid\n\n%s' % str(e))
