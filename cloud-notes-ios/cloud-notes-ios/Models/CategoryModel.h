//
//  CategoryModel.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CategoryModel : NSObject

@property(copy, nonatomic) NSString *title;
@property(copy, nonatomic) NSDate *date;
@property(copy, nonatomic) NSNumber *numDocuments;
@property(copy, nonatomic) NSString *id;
@property(copy, nonatomic) NSString *queryTitle;


-(instancetype) initWithDictionary: (NSDictionary *)categoryObject;

@end
