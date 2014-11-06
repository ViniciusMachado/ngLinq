(function () {
    "use strict"

    var module = angular.module('ng-Linq', []);
    module.service('Linq', function ($q, $filter) {
        //propriedades
        var select = Array();
        var newselectwhere = Array();
        var typewhere = "";

        //constantes
        var conIgual = "==";
        var conDif = "!=";
        var conMenor = "<";
        var conMaior = ">";
        var conMenorIgual = "<=";
        var conMaiorIgual = ">=";
        var conAND = "&&";
        var conOR = "||";


        //
        this.Where = function (scope) {
            var deferred = $q.defer();

            var result = "";
            try {

                if ((scope.indexOf("(") < scope.indexOf(conAND) || scope.indexOf(conAND) == -1) && (scope.indexOf("(") < scope.indexOf(conOR) || scope.indexOf(conOR) == -1)) {
                    typewhere = "";
                    result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                }
                else {
                    console.log(newselectwhere);
                    console.log(scope);
                    if (scope.indexOf(conAND) > scope.indexOf(conOR)) {
                        typewhere = "A";
                        scope = $.trim(scope.substring(scope.indexOf(conAND) + 2, scope.length));
                        result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                    }
                    else if (scope.indexOf(conOR) > scope.indexOf(conAND)) {
                        typewhere = "O";
                        scope = $.trim(scope.substring(scope.indexOf(conOR) + 2, scope.length));
                        result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                    }
                    console.log(typewhere);
                }

                if (scope.indexOf(conAND) > -1) {

                    scope = $.trim(scope.substring(scope.indexOf(conAND) - 1, scope.length));
                }
                else if (scope.indexOf(conOR) > -1) {

                    scope = $.trim(scope.substring(scope.indexOf(conOR) - 1, scope.length));
                }


                if (result.indexOf(conIgual) > 0) {

                    var prop1 = $.trim(result.substring(0, result.indexOf(conIgual)));
                    var prop2 = result.substring(result.indexOf(conIgual) + 3, result.length);

                    if (typewhere == "O" || typewhere == "") {

                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] == prop2) {
                                newselectwhere.push(obj);
                            }
                        })
                    }
                    else {
                        var newselect = Array();
                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] == prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;

                    }

                }
                else if (result.indexOf(conDif) > 0) {

                    var prop1 = $.trim(result.substring(0, result.indexOf(conDif)));
                    var prop2 = result.substring(result.indexOf(conDif) + 3, result.length);

                    if (typewhere == "O" || typewhere == "") {
                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] != prop2) {
                                newselectwhere.push(obj);
                            }
                        })
                    }
                    else {
                        var newselect = Array();

                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] != prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;
                    }
                }
                else if ((result.indexOf(conMenor) > 0) && (result.indexOf("=") == -1)) {
                    
                    var prop1 = $.trim(result.substring(0, result.indexOf(conMenor)));
                    var prop2 = result.substring(result.indexOf(conMenor) + 2, result.length);
                    

                    if (typewhere == "O" || typewhere == "") {
                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);
                            if (obj[prop1] < prop2) {
                                newselectwhere.push(obj);
                            }
                        })

                    }
                    else {
                        var newselect = Array();

                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] < prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;
                    }
                }
                else if ((result.indexOf(conMaior) > 0) && (result.indexOf("=") == -1)) {

                    var prop1 = $.trim(result.substring(0, result.indexOf(conMaior)));
                    var prop2 = result.substring(result.indexOf(conMaior) + 2, result.length);

                    if (typewhere == "O" || typewhere == "") {
                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] > prop2) {
                                newselectwhere.push(obj);
                            }
                        })
                    }
                    else {
                        
                        var newselect = Array();

                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] > prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;

                    }

                }
                else if (result.indexOf(conMenorIgual) > 0) {

                    var prop1 = $.trim(result.substring(0, result.indexOf(conMenorIgual)));
                    var prop2 = result.substring(result.indexOf(conMenorIgual) + 3, result.length);

                    if (typewhere == "O" || typewhere == "") {
                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] <= prop2) {
                                newselectwhere.push(obj);
                            }
                        })

                    }
                    else {
                        var newselect = Array();

                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] <= prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;
                    }
                }
                else if (result.indexOf(conMaiorIgual) > 0) {

                    var prop1 = $.trim(result.substring(0, result.indexOf(conMaiorIgual)));
                    var prop2 = result.substring(result.indexOf(conMaiorIgual) + 3, result.length);

                    if (typewhere == "O" || typewhere == "") {
                        $.each(select, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] >= prop2) {
                                newselectwhere.push(obj);
                            }
                        })
                    }
                    else {
                        var newselect = Array();

                        $.each(newselectwhere, function (i, o) {
                            var obj = $.extend({}, this);

                            if (obj[prop1] >= prop2) {
                                newselect.push(obj);
                            }
                        })

                        newselectwhere = newselect;
                    }
                }
                
                if ((scope.indexOf(conAND) >= 0) || (scope.indexOf(conOR) >= 0)) {
                    deferred.resolve(this.Where(scope));
                }
                else {
                    deferred.resolve(select = distinct(newselectwhere));
                    newselectwhere = Array();
                }

            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //Projection Operators
        this.Select = function (props) {
            var deferred = $q.defer();
            var newselect = Array();
            try {
                var lprops = props.split(",");

                $.each(select, function (i, o) {
                    var obj = $.extend({}, this);
                    var newObj = {};
                    for (var i = 0; i < lprops.length; i++) {

                        if ((lprops[i].indexOf(" AS ") > -1) || (lprops[i].indexOf(" as ")) > -1) {

                            if ((lprops[i].indexOf(" as ")) > -1) {
                                var lpro = lprops[i].split(" as ");
                            }
                            else {
                                var lpro = lprops[i].split(" AS ");
                            }

                            newObj[$.trim(lpro[1])] = obj[$.trim(lpro[0])];
                        }
                        else {
                            newObj[lprops[i]] = obj[lprops[i]];
                        }
                    }

                    newselect.push(newObj);
                })

                deferred.resolve(select = newselect);
            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //Projection Operators 
        this.From = function (scope) {
            var deferred = $q.defer();
            try {
                deferred.resolve(select = scope);
            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        };

        //Projection Operators 

        this.Join = function (from2, scope) {
            var deferred = $q.defer();
            var insert = false;
            var result = "";
            var scopeOriginal = scope;
            var newselectjoin = [];
            var secundJoin = false;
            try {
                $.each(select, function (i, o) {
                    scope = scopeOriginal;

                    var insert = false;
                    var obj = $.extend({}, this);

                    if ((scope.indexOf("(") > scope.indexOf(conAND) && scope.indexOf(conAND) == -1) && (scope.indexOf("(") > scope.indexOf(conOR) && scope.indexOf(conOR) == -1)) {
                        typewhere = "";
                        result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                    }
                    else {
                        if (scope.indexOf(conAND) > scope.indexOf(conOR)) {
                            typewhere = "A";
                            scope = $.trim(scope.substring(scope.indexOf(conAND) + 2, scope.length));
                            result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                        }
                        else if (scope.indexOf(conOR) > scope.indexOf(conAND)) {
                            typewhere = "O";
                            scope = $.trim(scope.substring(scope.indexOf(conOR) + 2, scope.length));
                            result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                        }
                    }


                    if (scope.indexOf(conAND) > -1) {
                        scope = $.trim(scope.substring(scope.indexOf(conAND) - 1, scope.length));
                    }
                    else if (scope.indexOf(conOR) > -1) {
                        scope = $.trim(scope.substring(scope.indexOf(conOR) - 1, scope.length));
                    }

                    $.each(from2, function (i, o) {
                        do {
                            var prop1 = $.trim(result.substring(0, result.indexOf(conIgual)));
                            var prop1_from = prop1.indexOf(".") > -1 ? prop1.split(".")[prop1.split(".").length > 2 ? 1 : 0] : "";
                            var prop1_field = prop1.indexOf(".") > -1 ? prop1.split(".")[prop1.split(".").length > 2 ? 2 : 1] : prop1;

                            var prop2 = result.substring(result.indexOf(conIgual) + 3, result.length);
                            var prop2_from = prop2.indexOf(".") > -1 ? prop2.split(".")[prop2.split(".").length > 2 ? 1 : 0] : "";
                            var prop2_field = prop2.indexOf(".") > -1 ? prop2.split(".")[prop2.split(".").length > 2 ? 2 : 1] : prop2;
                            secundJoin = prop2.split(".").length > 2;

                            var obj2 = $.extend({}, this);

                            if (obj[prop2_field] == obj2[prop1_field]) {
                                insert = true;
                            }
                            else if (obj[prop2_from + '.' + prop2_field] == obj2[prop1_field]) {
                                insert = true;
                            }
                            else {
                                insert = false;
                                break;
                            }

                        } while (scope.indexOf(conAND) > -1 || scope.indexOf(conOR) > -1)
                        if (insert) {

                            newselectjoin.push(unionObj(
                                    [
                                      { "From": secundJoin ? "" : prop2_from, "Obj": obj },
                                      { "From": prop1_from, "Obj": obj2 }
                                    ]));
                        }
                    });

                });
                deferred.resolve(select = newselectjoin);

            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        this.LeftJoin = function (from2, scope) {
            var deferred = $q.defer();
            var result = "";
            var insert = false;
            var undef = false;
            var newselectleftjoin = [];
            var secundJoin = false;
            var scopeOriginal = scope;
            try {

                $.each(select, function (i, o) {
                    scope = scopeOriginal;

                    insert = false;
                    undef = false;
                    var obj = $.extend({}, this);

                    if ((scope.indexOf("(") > scope.indexOf(conAND) && scope.indexOf(conAND) == -1) && (scope.indexOf("(") > scope.indexOf(conOR) && scope.indexOf(conOR) == -1)) {
                        typewhere = "";
                        result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                    }
                    else {
                        if (scope.indexOf(conAND) > scope.indexOf(conOR)) {
                            typewhere = "A";
                            scope = $.trim(scope.substring(scope.indexOf(conAND) + 2, scope.length));
                            result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                        }
                        else if (scope.indexOf(conOR) > scope.indexOf(conAND)) {
                            typewhere = "O";
                            scope = $.trim(scope.substring(scope.indexOf(conOR) + 2, scope.length));
                            result = scope.substring(scope.indexOf("(") + 1, scope.indexOf(")"));
                        }
                    }


                    if (scope.indexOf(conAND) > -1) {
                        scope = $.trim(scope.substring(scope.indexOf(conAND) - 1, scope.length));
                    }
                    else if (scope.indexOf(conOR) > -1) {

                        scope = $.trim(scope.substring(scope.indexOf(conOR) - 1, scope.length));
                    }

                    $.each(from2, function (i, o) {
                        do {
                            var prop1 = $.trim(result.substring(0, result.indexOf(conIgual)));
                            var prop1_from = prop1.indexOf(".") > -1 ? prop1.split(".")[prop1.split(".").length > 2 ? 1 : 0] : "";
                            var prop1_field = prop1.indexOf(".") > -1 ? prop1.split(".")[prop1.split(".").length > 2 ? 2 : 1] : prop1;

                            var prop2 = result.substring(result.indexOf(conIgual) + 3, result.length);
                            var prop2_from = prop2.indexOf(".") > -1 ? prop2.split(".")[prop2.split(".").length > 2 ? 1 : 0] : "";
                            var prop2_field = prop2.indexOf(".") > -1 ? prop2.split(".")[prop2.split(".").length > 2 ? 2 : 1] : prop2;
                            secundJoin = prop2.split(".").length > 2;

                            var obj2 = $.extend({}, this);

                            if (secundJoin) {

                                if (obj[prop2_from + '.' + prop2_field] == undefined) {
                                    undef = true;
                                }
                            } else {

                                if (obj[prop1_field] == undefined) {
                                    undef = true;
                                }
                            }


                            if ((obj[prop2_field] == obj2[prop1_field])) {
                                insert = true;
                            }
                            else if (obj[prop2_from + '.' + prop2_field] == obj2[prop1_field]) {
                                insert = true;
                            }
                            else {
                                insert = false;
                                break;
                            }


                        } while (scope.indexOf(conAND) > -1 || scope.indexOf(conOR) > -1)

                        if (insert) {
                            newselectleftjoin.push(unionObj(
                                    [
                                      { "From": secundJoin ? "" : prop2_from, "Obj": obj },
                                     { "From": prop1_from, "Obj": obj2 }
                                    ]));
                        }
                        if (undef) {
                            newselectleftjoin.push(unionObj(
                                    [
                                      { "From": secundJoin ? "" : prop2_from, "Obj": obj },
                                     { "From": prop1_from, "Obj": "" }
                                    ]));
                        }

                    });

                });

                deferred.resolve(select = distinct(newselectleftjoin));
            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        function unionObj(array) {
            var newObj = {};

            $.each(array, function (i, o) {
                var obj = $.extend({}, this);
                var from = obj["From"];

                for (var key in obj["Obj"]) {
                    if (from != "") {
                        newObj[from + "." + key] = obj["Obj"][key];
                    }
                    else {
                        newObj[key] = obj["Obj"][key];
                    }
                }
            });

            return newObj;
        }

        function distinct (from) {
            var newselect = Array();
            $.each(from, function (i, o) {
                var insert = true;
                var obj = $.extend({}, this);

                if (newselect.length > 0) {
                    $.each(newselect, function (i, o) {
                        var obj2 = $.extend({}, this);
                        if (JSON.stringify(obj) == JSON.stringify(obj2)) {
                            insert = false;
                        }

                    });
                    if (insert) {
                        newselect.push(obj);
                    }
                }
                else {
                    newselect.push(obj);
                }
            });
            return newselect;
        }

        //Partitioning Operators
        this.Take = function (value) {
            var deferred = $q.defer();
            var newselect = Array();
            try {
                if (value > select.length) {
                    value = select.length;
                }
                for (var i = 0; i < value; i++) {
                    newselect.push(select[i]);
                }

                deferred.resolve(select = newselect);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        this.Skip = function (value) {
            var deferred = $q.defer();
            var newselect = [];
            try {

                for (var i = value; i < select.length; i++) {
                    newselect.push(select[i]);
                }
                deferred.resolve(select = newselect);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        //Ordering Operators
        this.OrderBy = function (column) {
            var deferred = $q.defer();
            try {
                deferred.resolve(select = $filter('orderBy')(select, column));
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        this.OrderByDesc = function (prop) {
            var deferred = $q.defer();
            try {
                deferred.resolve(select = $filter('orderBy')(select, "-" + prop));
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        //Element Operators
        this.First = function () {
            var deferred = $q.defer();
            var result;
            try {
                deferred.resolve(select[0]);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        this.ElementAt = function (index) {
            var deferred = $q.defer();
            try {
                deferred.resolve(select[index]);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        //Set Operators

        this.Distinct = function () {
            var deferred = $q.defer();
            var newselect = Array();

            try {
                $.each(select, function (i, o) {
                    var insert = true;
                    var obj = $.extend({}, this);

                    if (newselect.length > 0) {
                        $.each(newselect, function (i, o) {
                            var obj2 = $.extend({}, this);
                            if (JSON.stringify(obj) == JSON.stringify(obj2)) {
                                insert = false;
                            }

                        });
                        if (insert) {
                            newselect.push(obj);
                        }
                    }
                    else {
                        newselect.push(obj);
                    }
                })

                deferred.resolve(select = newselect);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }

        this.Union = function (from, props) {
            var deferred = $q.defer();
            var newselect = Array();
            try {


                if (props == undefined) {
                    $.each(select, function (i, o) {
                        var obj = $.extend({}, this);
                        newselect.push(obj);
                    });

                    $.each(from, function (i, o) {
                        var obj = $.extend({}, this);
                        newselect.push(obj);
                    });
                    select = newselect;
                }
                else {
                    lprops = props.split(",");
                    $.each(select, function (i, o) {
                        var obj = $.extend({}, this);
                        var newObj = {};
                        for (var i = 0; i < lprops.length; i++) {
                            newObj[lprops[i]] = obj[lprops[i]];
                        }
                        newselect.push(newObj);
                    });

                    $.each(from, function (i, o) {
                        var obj = $.extend({}, this);
                        var newObj = {};
                        for (var i = 0; i < lprops.length; i++) {
                            newObj[lprops[i]] = obj[lprops[i]];
                        }
                        newselect.push(newObj);
                    });

                    select = newselect;

                }
                deferred.resolve(this.Distinct().then(function (data) { return data }));
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }


        //Aggregate Operators

        this.Count = function () {
            var deferred = $q.defer();
            try {

                deferred.resolve(select.length);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;

        };

        this.Sum = function (prop) {
            var sum = 0;
            var deferred = $q.defer();
            try {

                $.each(select, function (i, o) {
                    var obj = $.extend({}, this);

                    if (obj[prop] != undefined) {
                        sum += Number(obj[prop]);
                    }

                })

                deferred.resolve(sum);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }

        this.Min = function (prop) {
            var min = 999999999;
            var deferred = $q.defer();
            try {
                $.each(select, function (i, o) {
                    var obj = $.extend({}, this);
                    if (obj[prop] != undefined) {

                        if (min > Number(obj[prop]))
                            min = Number(obj[prop]);
                    }
                })
                deferred.resolve(min);
            }
            catch (e) {
                deferred.reject(e);
            }

            return deferred.promise;
        }

        this.Max = function (prop) {
            var max = 0;
            var deferred = $q.defer();
            try {
                $.each(select, function (i, o) {
                    var obj = $.extend({}, this);
                    if (obj[prop] != undefined) {
                        if (max < Number(obj[prop]))
                            max = Number(obj[prop]);
                    }

                })
                deferred.resolve(max);
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }

        this.Averange = function (prop) {
            var sum = 0;
            var deferred = $q.defer();
            try {
                $.each(select, function (i, o) {
                    var obj = $.extend({}, this);
                    if (obj[prop] != undefined) {
                        sum += Number(obj[prop]);
                    }

                })
                deferred.resolve(Math.round(sum / select.length));
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise;
        }

    });

    module.directive('ng-linq', function () { })

}());